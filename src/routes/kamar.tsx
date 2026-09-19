import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BedDouble, Check, MessageCircle, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms, rupiah, waLink } from "@/data/vila";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

export const Route = createFileRoute("/kamar")({
  head: () => ({
    meta: [
      { title: "Kamar & Harga — Vila Nirwana Bandungan | Vila Bandungan Murah" },
      {
        name: "description",
        content:
          "Daftar kamar dan harga Vila Nirwana Bandungan mulai Rp 600.000 per malam. Kamar deluxe mountain view, family twin, dan loft untuk staycation Semarang & gathering.",
      },
      { property: "og:title", content: "Kamar & Harga — Vila Nirwana Bandungan" },
      { property: "og:description", content: "Pilihan kamar, fasilitas, dan harga per malam di Vila Nirwana Bandungan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kamar" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Kamar Vila Nirwana Bandungan",
          itemListElement: rooms.map((room, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "HotelRoom",
              name: room.name,
              description: room.copy,
              offers: { "@type": "Offer", price: room.price, priceCurrency: "IDR" },
            },
          })),
        }),
      },
    ],
  }),
  component: KamarPage,
});

function KamarPage() {
  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Beranda Vila Nirwana Bandungan">
            <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className="size-9 rounded-full" />
            <span className="font-display text-lg text-foreground">Vila Nirwana</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost"><Link to="/"><ArrowLeft className="size-4" /> Beranda</Link></Button>
            <Button asChild variant="gold"><Link to="/reservasi"><MessageCircle className="size-4" /> Reservasi</Link></Button>
          </div>
        </div>
      </header>

      <section className="px-5 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Kamar & harga</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">Pilih kamar yang paling pas untuk rencana menginap Anda.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Semua harga berlaku per malam, sudah termasuk penggunaan dapur, ruang keluarga, taman, dan area parkir. Harga
            dapat berubah pada musim ramai, hari besar, dan akhir pekan panjang.
          </p>

          <div className="mt-12 flex flex-col gap-8">
            {rooms.map((room, index) => (
              <article
                key={room.id}
                className="grid overflow-hidden rounded-lg border border-border bg-card shadow-soft lg:grid-cols-2"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  loading={index === 0 ? "eager" : "lazy"}
                  width={1280}
                  height={854}
                  className={`h-64 w-full object-cover lg:h-full ${index % 2 === 1 ? "lg:order-2" : ""}`}
                />
                <div className="p-7 sm:p-9">
                  <h2 className="text-3xl">{room.name}</h2>
                  <p className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><UsersRound className="size-4 text-primary" /> {room.capacity}</span>
                    <span className="flex items-center gap-1.5"><BedDouble className="size-4 text-primary" /> {room.beds}</span>
                  </p>
                  <p className="mt-5 leading-7 text-muted-foreground">{room.copy}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                      <span className="font-display text-3xl text-primary">{rupiah(room.price)}</span>
                      <span className="text-sm text-muted-foreground"> / malam</span>
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button asChild variant="gold">
                        <Link to="/reservasi" search={{ kamar: room.id }}>Reservasi kamar ini <ArrowRight className="size-4" /></Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={waLink(`Halo Vila Nirwana Bandungan, saya ingin bertanya tentang ${room.name}.`)} target="_blank" rel="noreferrer">
                          <MessageCircle className="size-4" /> Tanya cepat
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-primary p-7 text-primary-foreground sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-highlight">Sewa seluruh vila</p>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Ingin memakai seluruh vila untuk rombongan atau gathering?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-primary-foreground/75">
              Tersedia paket sewa seluruh vila (3 kamar, dapur, ruang keluarga, dan taman) untuk keluarga besar maupun acara
              kantor. Sampaikan tanggal dan jumlah tamu Anda, kami bantu susun penawarannya.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-7">
              <Link to="/reservasi">Ajukan reservasi rombongan <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
