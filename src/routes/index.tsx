import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  ChefHat,
  Instagram,
  MapPin,
  MessageCircle,
  Mountain,
  Navigation,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/vila-nirwana-hero.png.asset.json";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

const whatsappUrl =
  "https://wa.me/6283116712967?text=Halo%20Vila%20Nirwana%20Bandungan%2C%20saya%20ingin%20bertanya%20tentang%20ketersediaan%20vila.";
const instagramUrl = "https://www.instagram.com/bandunganvillanirwana";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Jl.%20Nusa%20Indah%2C%20Jetak%2C%20Duren%2C%20Bandungan%2C%20Kabupaten%20Semarang%2C%20Jawa%20Tengah%2050614";

const facilities = [
  { icon: BedDouble, title: "Kamar Tidur Luas", copy: "Ruang beristirahat yang lega untuk menemani malam yang tenang bersama orang tersayang." },
  { icon: ChefHat, title: "Dapur Lengkap", copy: "Siapkan hidangan favorit dan nikmati momen makan bersama dengan lebih leluasa." },
  { icon: UsersRound, title: "Area Gathering", copy: "Ruang berkumpul yang hangat untuk keluarga, sahabat, maupun acara kelompok kecil." },
  { icon: Mountain, title: "View Pegunungan", copy: "Pemandangan hijau dan udara Bandungan yang sejuk, menyegarkan dari pagi hingga petang." },
  { icon: Navigation, title: "Lokasi Strategis", copy: "Berada di kawasan Bandungan dan mudah dijangkau untuk memulai agenda liburan Anda." },
  { icon: Sparkles, title: "Suasana Privat", copy: "Waktu berkualitas terasa lebih dekat dalam suasana yang nyaman dan menenangkan." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vila Nirwana Bandungan | Vila Sejuk untuk Liburan & Gathering" },
      { name: "description", content: "Nikmati staycation, liburan keluarga, dan gathering dalam sejuknya Bandungan di Vila Nirwana. Hubungi kami via WhatsApp untuk cek ketersediaan." },
      { property: "og:title", content: "Vila Nirwana Bandungan" },
      { property: "og:description", content: "Ruang hangat untuk beristirahat, berkumpul, dan menciptakan cerita di sejuknya Bandungan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#beranda" className="flex items-center gap-2.5" aria-label="Vila Nirwana Bandungan">
      <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className={compact ? "size-9 rounded-full" : "size-11 rounded-full"} />
      <span className="font-display text-lg text-foreground">Vila Nirwana <span className="hidden sm:inline">Bandungan</span></span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">{children}</p>;
}

function Index() {
  return (
    <main id="beranda" className="overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-primary-foreground/15 bg-primary/25 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="[&_span]:text-primary-foreground"><Logo compact /></div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-primary-foreground/85 md:flex" aria-label="Navigasi utama">
            <a href="#tentang" className="transition-colors hover:text-highlight">Tentang</a>
            <a href="#fasilitas" className="transition-colors hover:text-highlight">Fasilitas</a>
            <a href="#galeri" className="transition-colors hover:text-highlight">Galeri</a>
            <a href="#lokasi" className="transition-colors hover:text-highlight">Lokasi</a>
          </nav>
          <Button asChild variant="gold" className="min-h-9 px-4 text-xs sm:text-sm">
            <Link to="/reservasi"><MessageCircle className="size-4" /> Reservasi</Link>
          </Button>
        </div>
      </header>

      <section className="relative flex min-h-[92svh] items-end bg-primary text-primary-foreground">
        <img src={heroAsset.url} alt="Vila modern di tengah pegunungan Bandungan saat senja" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_92%,transparent)_0%,color-mix(in_oklab,var(--primary)_68%,transparent)_52%,color-mix(in_oklab,var(--primary)_18%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/25" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 lg:px-8 lg:pb-16">
          <div className="max-w-3xl animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-highlight/50 bg-primary/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-highlight backdrop-blur-sm">
              <Mountain className="size-3.5" /> Sejuknya Bandungan, hangatnya kebersamaan
            </p>
            <h1 className="max-w-2xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Pelarian Sempurna di <em className="text-highlight">Kesejukan</em> Lereng Gunung.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Ruang hangat untuk beristirahat, berkumpul, dan menciptakan cerita yang ingin Anda kenang lebih lama.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg"><Link to="/reservasi"><MessageCircle className="size-5" /> Reservasi Sekarang <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" className="border border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground shadow-none hover:bg-primary-foreground/20">
                <a href="#fasilitas">Jelajahi Vila</a>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-3 border-t border-primary-foreground/25 pt-5 text-primary-foreground/80">
            <div><strong className="block text-lg text-primary-foreground">Udara</strong><span className="text-xs sm:text-sm">Sejuk & segar</span></div>
            <div className="border-l border-primary-foreground/20 pl-4 sm:pl-7"><strong className="block text-lg text-primary-foreground">Suasana</strong><span className="text-xs sm:text-sm">Hangat & tenang</span></div>
            <div className="border-l border-primary-foreground/20 pl-4 sm:pl-7"><strong className="block text-lg text-primary-foreground">Momen</strong><span className="text-xs sm:text-sm">Lebih berkesan</span></div>
          </div>
        </div>
      </section>

      <section id="tentang" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <SectionLabel>Tentang Vila Nirwana</SectionLabel>
            <h2 className="max-w-xl text-4xl leading-tight sm:text-5xl">Ruang hangat untuk merajut cerita bersama orang terkasih.</h2>
            <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">Vila Nirwana Bandungan hadir sebagai tempat beristirahat dari padatnya rutinitas. Nikmati udara sejuk pegunungan, waktu tanpa terburu-buru, dan ruang yang terasa dekat untuk keluarga maupun sahabat.</p>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Mulai dari staycation santai, liburan keluarga, hingga gathering yang akrab, setiap sudutnya dirancang untuk membuat kebersamaan terasa lebih nyaman dan berkesan.</p>
            <blockquote className="mt-8 border-l-2 border-highlight pl-5 font-display text-2xl italic leading-snug text-primary">“Kenyamanan terbaik bukan tentang kemewahan semata, tetapi tentang waktu berkualitas bersama.”</blockquote>
          </div>
          <div className="relative min-h-[390px] overflow-hidden rounded-lg shadow-soft sm:min-h-[500px]">
            <img src={heroAsset.url} alt="Pemandangan dan suasana Vila Nirwana Bandungan" className="absolute inset-0 size-full object-cover object-[58%_center] transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary to-transparent p-6 pt-24 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight">Di tengah hijaunya Bandungan</p>
              <p className="mt-1 font-display text-2xl">Tempat pulang sejenak dari kesibukan.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fasilitas" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionLabel>Fasilitas & keunggulan</SectionLabel>
            <h2 className="text-4xl sm:text-5xl">Kenyamanan maksimal di setiap sudut.</h2>
            <p className="mt-4 text-muted-foreground">Semua yang Anda perlukan untuk menikmati waktu berkualitas dalam suasana tenang dan penuh kehangatan.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="group rounded-lg border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-highlight">
                <span className="mb-8 flex size-11 items-center justify-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-highlight"><Icon className="size-5" /></span>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-primary">Nikmati selama menginap</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Detail fasilitas dapat dikonfirmasi langsung melalui WhatsApp.</p>
        </div>
      </section>

      <section id="galeri" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Galeri & suasana</SectionLabel>
              <h2 className="text-4xl sm:text-5xl">Lihat keseruan & suasana asri langsung di Instagram.</h2>
              <p className="mt-4 text-muted-foreground">Intip dokumentasi vila, pemandangan, dan cerita para tamu kami.</p>
            </div>
            <Button asChild variant="outline"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram className="size-4" /> @bandunganvillanirwana</a></Button>
          </div>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="group relative block h-[360px] overflow-hidden rounded-lg sm:h-[480px]">
            <img src={heroAsset.url} alt="Galeri Vila Nirwana Bandungan" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 transition-colors group-hover:bg-primary/35">
              <span className="flex size-16 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary/65 text-primary-foreground backdrop-blur"><Instagram className="size-7" /></span>
            </div>
          </a>
          <div className="mt-4 flex flex-col justify-between gap-4 rounded-lg bg-primary p-5 text-primary-foreground sm:flex-row sm:items-center sm:p-7">
            <div><p className="font-display text-2xl">Follow Instagram kami untuk info terbaru.</p><p className="mt-1 text-sm text-primary-foreground/70">Temukan lebih banyak sudut vila dan inspirasi liburan Anda.</p></div>
            <Button asChild variant="gold"><a href={instagramUrl} target="_blank" rel="noreferrer">Buka Instagram <ArrowRight className="size-4" /></a></Button>
          </div>
        </div>
      </section>

      <section id="lokasi" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Lokasi & reservasi</SectionLabel>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Rencanakan liburan impian Anda hari ini.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Pilih tanggal istimewa Anda dan konsultasikan kebutuhan rombongan secara langsung bersama tim kami.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-lg border border-border bg-card p-7 shadow-soft">
              <span className="flex size-12 items-center justify-center rounded-md bg-secondary text-primary"><MapPin className="size-5" /></span>
              <h3 className="mt-6 text-3xl">Alamat Vila Nirwana</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Jl. Nusa Indah, Jetak, Duren, Bandungan, Kabupaten Semarang, Jawa Tengah 50614</p>
              <Button asChild variant="outline" className="mt-7"><a href={mapsUrl} target="_blank" rel="noreferrer"><Navigation className="size-4" /> Buka Google Maps</a></Button>
            </div>
            <div className="rounded-lg bg-primary p-7 text-primary-foreground shadow-soft sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-highlight">Respons langsung via WhatsApp</p>
              <h3 className="mt-4 max-w-xl text-3xl sm:text-4xl">Konsultasikan jadwal staycation Anda.</h3>
              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/75">Tanyakan ketersediaan tanggal dan sampaikan kebutuhan acara Anda. Kami siap membantu Anda memulai rencana liburan dengan mudah.</p>
              <Button asChild variant="gold" size="lg" className="mt-7 w-full sm:w-auto"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="size-5" /> Chat WhatsApp Sekarang</a></Button>
              <p className="mt-4 text-xs text-primary-foreground/60">Pesan otomatis sudah disiapkan untuk memulai percakapan.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_.7fr_1fr]">
          <div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Sejuknya Bandungan, hangatnya kebersamaan. Tempat untuk berhenti sejenak dan menikmati waktu yang berarti.</p></div>
          <div><p className="font-semibold">Navigasi</p><div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground"><a href="#tentang">Tentang kami</a><a href="#fasilitas">Fasilitas</a><a href="#galeri">Galeri</a><a href="#lokasi">Lokasi</a></div></div>
          <div><p className="font-semibold">Kontak</p><div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground"><a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Instagram className="size-4" /> @bandunganvillanirwana</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2"><MessageCircle className="size-4" /> 0831 1671 2967</a></div></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between"><p>© 2026 Vila Nirwana Bandungan. Seluruh hak dilindungi.</p><p>Hospitality in the heart of Bandungan.</p></div>
      </footer>
    </main>
  );
}