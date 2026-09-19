import Intro from "./components/Intro";
import LatarBelakang from "./components/LatarBelakang";
import Kreadibilitas from "./components/Kreadibilitas";
import Garansi from "./components/Garansi";
import CtaTentang from "./components/CtaTentang";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tentang Kami — Tyrexion",
  description: "Kenalan lebih dekat dengan Tyrexion, jasa pembuatan website yang lahir dari semangat Try, Expand, and Action. Kredibilitas, proses transparan, dan garansi jelas.",
};

export default function Tentang() {
  return (
     <main className="overflow-x-hidden" style={{ marginTop: "80px" }}>
       <Intro />

       <LatarBelakang />

       <Kreadibilitas />

       <Garansi />

       <CtaTentang />

       <Footer />
     </main>
  )
}