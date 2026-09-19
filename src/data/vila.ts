import kamarDeluxe from "@/assets/kamar-deluxe.jpg";
import kamarFamily from "@/assets/kamar-family.jpg";
import kamarLoft from "@/assets/kamar-loft.jpg";
import fasilitasDapur from "@/assets/fasilitas-dapur.jpg";
import fasilitasGathering from "@/assets/fasilitas-gathering.jpg";
import fasilitasTaman from "@/assets/fasilitas-taman.jpg";
import fasilitasParkir from "@/assets/fasilitas-parkir.jpg";
import galeriSunrise from "@/assets/galeri-sunrise.jpg";

export const WA_NUMBER = "6283116712967";
export const instagramUrl = "https://www.instagram.com/bandunganvillanirwana";
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Jl.%20Nusa%20Indah%2C%20Jetak%2C%20Duren%2C%20Bandungan%2C%20Kabupaten%20Semarang%2C%20Jawa%20Tengah%2050614";

export const rooms = [
  {
    id: "deluxe",
    name: "Kamar Deluxe Mountain View",
    price: 750_000,
    image: kamarDeluxe,
    capacity: "2 tamu",
    beds: "1 king bed",
    copy: "Kamar utama dengan jendela lebar menghadap barisan pegunungan berkabut. Pilihan favorit untuk pasangan yang ingin bangun disambut udara sejuk Bandungan.",
    features: ["Kasur king size", "Kamar mandi dalam + water heater", "Balkon view pegunungan", "Smart TV & WiFi", "Lemari & meja rias"],
  },
  {
    id: "family",
    name: "Kamar Family Twin",
    price: 850_000,
    image: kamarFamily,
    capacity: "4 tamu",
    beds: "2 queen bed",
    copy: "Ruang lega dengan dua tempat tidur besar, dibuat untuk keluarga yang ingin tetap berkumpul dalam satu kamar tanpa terasa sempit.",
    features: ["2 queen bed", "Kamar mandi dalam + water heater", "Area duduk keluarga", "Smart TV & WiFi", "Selimut hangat tambahan"],
  },
  {
    id: "loft",
    name: "Loft Sharing Room",
    price: 600_000,
    image: kamarLoft,
    capacity: "5 tamu",
    beds: "3 single + bunk",
    copy: "Kamar loft kayu yang hangat dengan lampu temaram, cocok untuk rombongan sahabat, komunitas, maupun acara gathering.",
    features: ["3 tempat tidur single", "Extra bed tersedia", "Skylight view gunung", "Kamar mandi bersama", "Area santai lesehan"],
  },
] as const;

export const facilities = [
  {
    title: "Dapur & Ruang Makan Lengkap",
    image: fasilitasDapur,
    copy: "Dapur dengan kompor, kulkas, dispenser, peralatan masak, dan meja makan panjang untuk sepuluh orang. Masak dan makan bersama jadi bagian paling seru dari liburan.",
  },
  {
    title: "Ruang Keluarga & Area Gathering",
    image: fasilitasGathering,
    copy: "Sofa besar, TV layar lebar, dan ruang terbuka yang nyaman untuk sharing session, nonton bareng, atau acara keluarga hingga 25 orang.",
  },
  {
    title: "Taman, Api Unggun & View Pegunungan",
    image: fasilitasTaman,
    copy: "Halaman rumput luas dengan area api unggun dan lampu gantung hangat. Tempat terbaik menikmati senja dan langit malam Bandungan.",
  },
  {
    title: "Parkir Luas & Lokasi Strategis",
    image: fasilitasParkir,
    copy: "Parkir untuk beberapa kendaraan tepat di depan vila, hanya beberapa menit dari pusat Bandungan dan mudah dijangkau dari Semarang maupun Ungaran.",
  },
] as const;

export const galleryImages = [
  { src: galeriSunrise, alt: "Sunrise dari balkon Vila Nirwana Bandungan" },
  { src: fasilitasTaman, alt: "Taman dan area api unggun Vila Nirwana Bandungan" },
  { src: fasilitasGathering, alt: "Ruang keluarga untuk gathering di Vila Nirwana" },
  { src: kamarDeluxe, alt: "Kamar deluxe dengan view pegunungan" },
  { src: fasilitasDapur, alt: "Dapur dan ruang makan Vila Nirwana Bandungan" },
  { src: kamarLoft, alt: "Loft sharing room yang hangat di Vila Nirwana" },
] as const;

export const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
