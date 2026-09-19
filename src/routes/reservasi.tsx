import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChefHat,
  Loader2,
  MessageCircle,
  Mountain,
  Navigation,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { rooms, rupiah, waLink } from "@/data/vila";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

const facilityOptions = [
  { id: "kamar", icon: BedDouble, label: "Kamar Tidur Luas" },
  { id: "dapur", icon: ChefHat, label: "Dapur & Ruang Makan" },
  { id: "gathering", icon: UsersRound, label: "Area Gathering" },
  { id: "view", icon: Mountain, label: "Taman & View Pegunungan" },
  { id: "lokasi", icon: Navigation, label: "Parkir & Akses Lokasi" },
  { id: "privat", icon: Sparkles, label: "Sewa Seluruh Vila" },
];

export const Route = createFileRoute("/reservasi")({
  validateSearch: (search: Record<string, unknown>) => ({
    kamar: typeof search.kamar === "string" ? search.kamar : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reservasi Vila Nirwana Bandungan | Booking Staycation Semarang" },
      {
        name: "description",
        content:
          "Formulir reservasi Vila Nirwana Bandungan: pilih kamar, tanggal, durasi, dan jumlah tamu. Reservasi tercatat otomatis dan langsung terkirim ke WhatsApp kami.",
      },
      { property: "og:title", content: "Reservasi — Vila Nirwana Bandungan" },
      { property: "og:description", content: "Pilih kamar, tanggal, durasi, dan jumlah tamu, lalu kirim reservasi Anda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reservasi" }],
  }),
  component: ReservasiPage,
});

const inputClass =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function ReservasiPage() {
  const { kamar: kamarAwal } = Route.useSearch();
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [durasi, setDurasi] = useState("1");
  const [tamu, setTamu] = useState("2");
  const [kamar, setKamar] = useState(kamarAwal && rooms.some((r) => r.id === kamarAwal) ? kamarAwal : "semua");
  const [catatan, setCatatan] = useState("");
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const toggleFasilitas = (id: string) =>
    setFasilitas((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const kamarLabel =
    kamar === "semua" ? "Sewa seluruh vila / belum menentukan" : rooms.find((r) => r.id === kamar)?.name ?? kamar;

  const tanggalLabel = tanggal
    ? new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return setError("Mohon isi nama Anda terlebih dahulu.");
    if (!tanggal) return setError("Mohon pilih tanggal check-in.");
    setError("");
    setLoading(true);

    const fasilitasLabel =
      fasilitas.length > 0
        ? fasilitas.map((id) => facilityOptions.find((f) => f.id === id)?.label).filter(Boolean).join(", ")
        : "Semua fasilitas standar";

    const { error: dbError } = await supabase.from("reservations").insert({
      nama: nama.trim(),
      check_in: tanggal,
      durasi: Number(durasi),
      tamu,
      kamar: kamarLabel,
      fasilitas,
      catatan: catatan.trim() || null,
    });

    setLoading(false);

    if (dbError) {
      setError("Reservasi belum tersimpan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.");
      return;
    }

    const pesan = [
      "Halo Vila Nirwana Bandungan, saya ingin melakukan reservasi.",
      "",
      `Nama: ${nama.trim()}`,
      `Tanggal check-in: ${tanggalLabel}`,
      `Durasi menginap: ${durasi} malam`,
      `Jumlah tamu: ${tamu} orang`,
      `Pilihan kamar: ${kamarLabel}`,
      `Fasilitas yang diminati: ${fasilitasLabel}`,
      ...(catatan.trim() ? [`Catatan: ${catatan.trim()}`] : []),
      "",
      "Mohon info ketersediaan dan detail harganya. Terima kasih.",
    ].join("\n");

    setSukses(true);
    window.open(waLink(pesan), "_blank", "noreferrer");
  };

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-18 max-w-3xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda Vila Nirwana">
            <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className="size-9 rounded-full" />
            <span className="font-display text-lg text-foreground">Vila Nirwana</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost"><Link to="/kamar"><BedDouble className="size-4" /> Kamar</Link></Button>
            <Button asChild variant="ghost"><Link to="/"><ArrowLeft className="size-4" /> Beranda</Link></Button>
          </div>
        </div>
      </header>

      <section className="px-5 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Formulir reservasi</p>
          <h1 className="text-4xl leading-tight sm:text-5xl">Rencanakan menginap Anda dalam satu langkah.</h1>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Isi detail rencana Anda di bawah ini. Reservasi akan tercatat pada sistem kami dan pesan ringkasannya langsung
            terbuka di WhatsApp untuk konfirmasi ketersediaan.
          </p>

          {sukses && (
            <div role="status" className="mt-8 rounded-md border border-primary/25 bg-secondary px-5 py-4 text-sm leading-6">
              <p className="font-semibold text-foreground">Reservasi Anda sudah tercatat.</p>
              <p className="mt-1 text-muted-foreground">
                Jika jendela WhatsApp tidak terbuka otomatis, gunakan tombol di bawah untuk mengirim ulang ringkasannya.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-border bg-card p-6 shadow-soft sm:p-9" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nama" className="mb-2 block text-sm font-semibold">Nama lengkap</label>
                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Reno Andri"
                  maxLength={100}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="tanggal" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="size-4 text-primary" /> Tanggal check-in
                </label>
                <input
                  id="tanggal"
                  type="date"
                  value={tanggal}
                  min={today}
                  onChange={(e) => setTanggal(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="durasi" className="mb-2 block text-sm font-semibold">Durasi menginap</label>
                <select id="durasi" value={durasi} onChange={(e) => setDurasi(e.target.value)} className={inputClass}>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} malam</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tamu" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <UsersRound className="size-4 text-primary" /> Jumlah tamu
                </label>
                <select id="tamu" value={tamu} onChange={(e) => setTamu(e.target.value)} className={inputClass}>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} orang</option>
                  ))}
                  <option value="20+">Lebih dari 20 orang (rombongan)</option>
                </select>
              </div>

              <div>
                <label htmlFor="kamar" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <BedDouble className="size-4 text-primary" /> Pilihan kamar
                </label>
                <select id="kamar" value={kamar} onChange={(e) => setKamar(e.target.value)} className={inputClass}>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name} — {rupiah(room.price)}/malam</option>
                  ))}
                  <option value="semua">Sewa seluruh vila / belum menentukan</option>
                </select>
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-sm font-semibold">Fasilitas yang ingin dipastikan tersedia</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {facilityOptions.map(({ id, icon: Icon, label }) => {
                    const active = fasilitas.includes(id);
                    return (
                      <label
                        key={id}
                        className={`flex cursor-pointer items-center gap-3 rounded-md border p-3.5 text-sm transition-colors ${
                          active
                            ? "border-primary bg-secondary font-semibold text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleFasilitas(id)}
                          className="size-4 accent-[var(--primary)]"
                        />
                        <Icon className="size-4 text-primary" />
                        {label}
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Opsional — kosongkan jika ingin menanyakan semua fasilitas standar.</p>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="catatan" className="mb-2 block text-sm font-semibold">Catatan tambahan (opsional)</label>
                <textarea
                  id="catatan"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Contoh: butuh extra bed, rencana acara gathering kantor, perkiraan jam tiba."
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" variant="gold" size="lg" className="mt-8 w-full" disabled={loading}>
              {loading ? <Loader2 className="size-5 animate-spin" /> : <MessageCircle className="size-5" />}
              {loading ? "Mengirim reservasi..." : "Kirim Reservasi via WhatsApp"}
              {!loading && <ArrowRight className="size-4" />}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Data reservasi tersimpan aman di sistem kami, lalu ringkasannya terbuka otomatis di WhatsApp.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
