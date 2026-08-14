import Hero from "./components/Hero";
import ButtonNav from "@/components/ButtonNav";
import HeroCard from "./components/HeroCard";
import Keuntungan from "./components/Keuntungan";
import AlurKerja from "./components/AlurKerja" 
import Kepercayaan from "./components/Kepercayaan";
import TemplateProyek from "./components/TemplateProyek";
import CtaHome from "./components/CtaHome";
import Footer from "@/components/Footer"

export default function Home() {

  return (
    <main className="overflow-x-hidden" style={{ marginTop: "80px" }}>
      <Hero />

      <HeroCard />

      <Keuntungan />

      <AlurKerja />

      <Kepercayaan />

      <TemplateProyek />

      <CtaHome />

      <Footer />
    </main>
  )
}