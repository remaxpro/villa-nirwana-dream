import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Loader2, LogOut, RefreshCw, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

type Reservation = {
  id: string;
  nama: string;
  check_in: string;
  durasi: number;
  tamu: string;
  kamar: string | null;
  fasilitas: string[];
  catatan: string | null;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Reservasi — Vila Nirwana Bandungan" },
      { name: "description", content: "Daftar reservasi yang masuk dari halaman reservasi Vila Nirwana Bandungan." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Dashboard Reservasi — Vila Nirwana Bandungan" },
      { property: "og:description", content: "Akses khusus pengelola vila." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const tanggal = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function DashboardPage() {
  const navigate = useNavigate();
  const [siap, setSiap] = useState(false);
  const [data, setData] = useState<Reservation[]>([]);
  const [error, setError] = useState("");
  const [memuat, setMemuat] = useState(false);

  const muatData = async () => {
    setMemuat(true);
    const { data: rows, error: dbError } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    setMemuat(false);
    if (dbError) return setError("Data reservasi belum bisa dimuat.");
    setError("");
    setData((rows ?? []) as Reservation[]);
  };

  useEffect(() => {
    let aktif = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!aktif) return;
      if (!session) {
        navigate({ to: "/masuk" });
        return;
      }
      setSiap(true);
      void muatData();
    });
    return () => { aktif = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keluar = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/masuk" });
  };

  if (!siap) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className="size-9 rounded-full" />
            <span className="font-display text-lg text-foreground">Vila Nirwana</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost"><Link to="/"><ArrowLeft className="size-4" /> Beranda</Link></Button>
            <Button variant="outline" onClick={keluar}><LogOut className="size-4" /> Keluar</Button>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Dashboard pengelola</p>
              <h1 className="text-4xl leading-tight sm:text-5xl">Reservasi yang masuk</h1>
              <p className="mt-3 text-muted-foreground">Total {data.length} reservasi tercatat, terbaru di urutan teratas.</p>
            </div>
            <Button variant="outline" onClick={muatData} disabled={memuat}>
              {memuat ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Muat ulang
            </Button>
          </div>

          {error && (
            <p role="alert" className="mt-8 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}

          {data.length === 0 && !error && (
            <p className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
              Belum ada reservasi yang masuk.
            </p>
          )}

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {data.map((r) => (
              <article key={r.id} className="rounded-lg border border-border bg-card p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl">{r.nama}</h2>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{r.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CalendarDays className="size-4 text-primary" /> {tanggal(r.check_in)} · {r.durasi} malam</span>
                  <span className="flex items-center gap-1.5"><UsersRound className="size-4 text-primary" /> {r.tamu} tamu</span>
                </div>
                {r.kamar && <p className="mt-3 text-sm"><span className="font-semibold">Kamar:</span> {r.kamar}</p>}
                {r.fasilitas.length > 0 && (
                  <p className="mt-1 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Fasilitas:</span> {r.fasilitas.join(", ")}</p>
                )}
                {r.catatan && <p className="mt-3 rounded-md bg-surface px-4 py-3 text-sm leading-6">{r.catatan}</p>}
                <p className="mt-4 text-xs text-muted-foreground">
                  Masuk {new Date(r.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
