import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChefHat,
  MessageCircle,
  Mountain,
  Navigation,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

const WA_NUMBER = "6283116712967";

const facilityOptions = [
  { id: "kamar", icon: BedDouble, label: "Kamar Tidur Luas" },
  { id: "dapur", icon: ChefHat, label: "Dapur Lengkap" },
  { id: "gathering", icon: UsersRound, label: "Area Gathering" },
  { id: "view", icon: Mountain, label: "View Pegunungan" },
  { id: "lokasi", icon: Navigation, label: "Info Lokasi & Akses" },
  { id: "privat", icon: Sparkles, label: "Suasana Privat" },
];

export const Route = createFileRoute("/reservasi")({
  head: () => ({
    meta: [
      { title: "Reservasi — Vila Nirwana Bandungan" },
      { name: "description", content: "Isi formulir reservasi Vila Nirwana Bandungan dan kirim langsung ke WhatsApp kami untuk konfirmasi ketersediaan." },
      { property: "og:title", content: "Reservasi — Vila Nirwana Bandungan" },
      { property: "og:description", content: "Rencanakan staycation Anda: pilih tanggal, durasi, jumlah tamu, dan fasilitas, lalu kirim via WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReservasiPage,
});

const inputClass =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function ReservasiPage() {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [durasi, setDurasi] = useState("1");
  const [tamu, setTamu] = useState("2");
  const [fasilitas, setFasilitas] = useState<string[]>([]);
  const [error, setError] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const toggleFasilitas = (id: string) =>
    setFasilitas((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const tanggalLabel = tanggal
    ? new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return setError("Mohon isi nama Anda terlebih dahulu.");
    if (!tanggal) return setError("Mohon pilih tanggal check-in.");
    setError("");

    const fasilitasLabel =
      fasilitas.length > 0
        ? fasilitas.map((id) => facilityOptions.find((f) => f.id === id)?.label).filter(Boolean).join(", ")
        : "Semua fasilitas standar";

    const pesan = [
      "Halo Vila Nirwana Bandungan, saya ingin melakukan reservasi.",
      "",
      `Nama: ${nama.trim()}`,
      `Tanggal check-in: ${tanggalLabel}`,
      `Durasi menginap: ${durasi} malam`,
      `Jumlah tamu: ${tamu} orang`,
      `Fasilitas yang diminati: ${fasilitasLabel}`,
      "",
      "Mohon info ketersediaan dan detail harganya. Terima kasih.",
    ].join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`, "_blank", "noreferrer");
  };

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-18 max-w-3xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Kembali ke beranda Vila Nirwana">
            <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className="size-9 rounded-full" />
            <span className="font-display text-lg text-foreground">Vila Nirwana</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/"><ArrowLeft className="size-4" /> Beranda</Link>
          </Button>
        </div>
      </header>

      <section className="px-5 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Formulir reservasi</p>
          <h1 className="text-4xl leading-tight sm:text-5xl">Rencanakan menginap Anda dalam satu langkah.</h1>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Isi detail rencana Anda di bawah ini. Setelah dikirim, pesan akan otomatis tersusun rapi dan terbuka di WhatsApp kami untuk konfirmasi ketersediaan.
          </p>

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

              <div className="sm:col-span-2">
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
            </div>

            {error && (
              <p role="alert" className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" variant="gold" size="lg" className="mt-8 w-full">
              <MessageCircle className="size-5" /> Kirim Reservasi via WhatsApp <ArrowRight className="size-4" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pesan akan terbuka di WhatsApp dengan detail yang sudah tersusun otomatis.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
