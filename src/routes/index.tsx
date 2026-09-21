import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Instagram,
  MapPin,
  MessageCircle,
  Mountain,
  Navigation,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { facilities, galleryImages, instagramUrl, mapsUrl, rooms, rupiah, waLink } from "@/data/vila";
import heroAsset from "@/assets/vila-nirwana-hero.png.asset.json";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

const whatsappUrl = waLink("Halo Vila Nirwana Bandungan, saya ingin bertanya tentang ketersediaan vila.");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vila Bandungan Murah — Vila Nirwana Bandungan | Staycation Semarang" },
      {
        name: "description",
        content:
          "Vila Nirwana Bandungan: vila Bandungan dengan view pegunungan untuk staycation Semarang, liburan keluarga, dan gathering. Kamar mulai Rp 600.000/malam, reservasi via WhatsApp.",
      },
      {
        name: "keywords",
        content: "vila Bandungan, staycation Semarang, villa Bandungan murah, vila keluarga Bandungan, gathering Bandungan",
      },
      { property: "og:title", content: "Vila Nirwana Bandungan | Vila Bandungan untuk Staycation Semarang" },
      {
        property: "og:description",
        content: "Ruang hangat untuk beristirahat, berkumpul, dan menciptakan cerita di sejuknya Bandungan. Kamar mulai Rp 600.000/malam.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Vila Nirwana Bandungan",
          description:
            "Vila di Bandungan, Kabupaten Semarang untuk staycation, liburan keluarga, dan gathering dengan view pegunungan.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jl. Nusa Indah, Jetak, Duren",
            addressLocality: "Bandungan",
            addressRegion: "Jawa Tengah",
            postalCode: "50614",
            addressCountry: "ID",
          },
          telephone: "+6283116712967",
          sameAs: [instagramUrl],
          priceRange: "Rp 600.000 - Rp 850.000",
        }),
      },
    ],
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
            <Link to="/kamar" className="transition-colors hover:text-highlight">Kamar & Harga</Link>
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
        <img src={heroAsset.url} alt="Vila Nirwana Bandungan di tengah pegunungan saat senja" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--primary)_92%,transparent)_0%,color-mix(in_oklab,var(--primary)_68%,transparent)_52%,color-mix(in_oklab,var(--primary)_18%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/25" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 lg:px-8 lg:pb-16">
          <div className="max-w-3xl animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-highlight/50 bg-primary/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-highlight backdrop-blur-sm">
              <Mountain className="size-3.5" /> Vila Bandungan untuk staycation & gathering
            </p>
            <h1 className="max-w-2xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Pelarian Sempurna di <em className="text-highlight">Kesejukan</em> Lereng Gunung.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Vila Nirwana Bandungan: ruang hangat untuk beristirahat, berkumpul, dan menciptakan cerita yang ingin Anda
              kenang lebih lama. Kamar mulai {rupiah(600_000)} per malam.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg"><Link to="/reservasi"><MessageCircle className="size-5" /> Reservasi Sekarang <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" className="border border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground shadow-none hover:bg-primary-foreground/20">
                <Link to="/kamar"><BedDouble className="size-5" /> Lihat Kamar & Harga</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-3 border-t border-primary-foreground/25 pt-5 text-primary-foreground/80">
            <div><strong className="block text-lg text-primary-foreground">3 Kamar</strong><span className="text-xs sm:text-sm">Hingga 11 tamu</span></div>
            <div className="border-l border-primary-foreground/20 pl-4 sm:pl-7"><strong className="block text-lg text-primary-foreground">Udara</strong><span className="text-xs sm:text-sm">Sejuk & segar</span></div>
            <div className="border-l border-primary-foreground/20 pl-4 sm:pl-7"><strong className="block text-lg text-primary-foreground">Gathering</strong><span className="text-xs sm:text-sm">Sampai 25 orang</span></div>
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
            <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" width={1280} height={854} className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary to-transparent p-6 pt-24 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight">Di tengah hijaunya Bandungan</p>
              <p className="mt-1 font-display text-2xl">Tempat pulang sejenak dari kesibukan.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="kamar" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Kamar & harga</SectionLabel>
              <h2 className="text-4xl sm:text-5xl">Tiga pilihan kamar, satu suasana yang menenangkan.</h2>
              <p className="mt-4 text-muted-foreground">Harga per malam sudah termasuk penggunaan dapur, ruang keluarga, taman, dan parkir.</p>
            </div>
            <Button asChild variant="outline"><Link to="/kamar">Detail kamar & harga <ArrowRight className="size-4" /></Link></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.id} className="overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <img src={room.image} alt={room.name} loading="lazy" width={1280} height={854} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl">{room.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{room.capacity} · {room.beds}</p>
                  <p className="mt-4"><span className="font-display text-2xl text-primary">{rupiah(room.price)}</span><span className="text-sm text-muted-foreground"> / malam</span></p>
                  <Button asChild variant="ghost" className="mt-4 px-0">
                    <Link to="/reservasi" search={{ kamar: room.id }}>Reservasi kamar ini <ArrowRight className="size-4" /></Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fasilitas" className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionLabel>Fasilitas & keunggulan</SectionLabel>
            <h2 className="text-4xl sm:text-5xl">Kenyamanan maksimal di setiap sudut.</h2>
            <p className="mt-4 text-muted-foreground">Semua yang Anda perlukan untuk menikmati waktu berkualitas dalam suasana tenang dan penuh kehangatan.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {facilities.map(({ title, copy, image }) => (
              <article key={title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-all duration-300 hover:border-highlight">
                <img src={image} alt={title} loading="lazy" width={1280} height={854} className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-72" />
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Mountain, label: "View pegunungan dari kamar & taman" },
              { icon: Navigation, label: "±10 menit dari pusat Bandungan" },
              { icon: Sparkles, label: "WiFi, water heater & air pegunungan" },
            ].map(({ icon: Icon, label }) => (
              <p key={label} className="flex items-center gap-3 rounded-md border border-border bg-card px-5 py-4 text-sm">
                <Icon className="size-5 shrink-0 text-primary" /> {label}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="galeri" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Galeri & suasana</SectionLabel>
              <h2 className="text-4xl sm:text-5xl">Suasana asri Vila Nirwana, dari pagi hingga malam.</h2>
              <p className="mt-4 text-muted-foreground">Intip dokumentasi vila, pemandangan, dan cerita para tamu kami di Instagram.</p>
            </div>
            <Button asChild variant="outline"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram className="size-4" /> @bandunganvillanirwana</a></Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map(({ src, alt }, i) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                loading="lazy"
                width={1280}
                height={854}
                className={`w-full rounded-lg object-cover transition-transform duration-700 hover:scale-[1.02] ${i === 0 ? "h-64 sm:col-span-2 sm:h-[340px]" : "h-64"}`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-col justify-between gap-4 rounded-lg bg-primary p-5 text-primary-foreground sm:flex-row sm:items-center sm:p-7">
            <div><p className="font-display text-2xl">Follow Instagram kami untuk info terbaru.</p><p className="mt-1 text-sm text-primary-foreground/70">Temukan lebih banyak sudut vila dan inspirasi liburan Anda.</p></div>
            <Button asChild variant="gold"><a href={instagramUrl} target="_blank" rel="noreferrer">Buka Instagram <ArrowRight className="size-4" /></a></Button>
          </div>
        </div>
      </section>

      <section id="lokasi" className="px-5 py-20 lg:px-8 lg:py-28">
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
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gold" size="lg"><Link to="/reservasi"><MessageCircle className="size-5" /> Isi Formulir Reservasi</Link></Button>
                <Button asChild size="lg" className="border border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground shadow-none hover:bg-primary-foreground/20">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">Chat WhatsApp</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_.7fr_1fr]">
          <div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Sejuknya Bandungan, hangatnya kebersamaan. Tempat untuk berhenti sejenak dan menikmati waktu yang berarti.</p></div>
          <div><p className="font-semibold">Navigasi</p><div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground"><a href="#tentang">Tentang kami</a><Link to="/kamar">Kamar & harga</Link><a href="#fasilitas">Fasilitas</a><a href="#galeri">Galeri</a><Link to="/reservasi">Reservasi</Link></div></div>
          <div><p className="font-semibold">Kontak</p><div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground"><a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2"><Instagram className="size-4" /> @bandunganvillanirwana</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2"><MessageCircle className="size-4" /> 0831 1671 2967</a></div></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between"><p>© 2026 Vila Nirwana Bandungan. Seluruh hak dilindungi.</p><Link to="/masuk">Masuk pengelola</Link></div>
      </footer>
    </main>
  );
}
