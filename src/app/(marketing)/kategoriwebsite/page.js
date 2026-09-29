import Pricing from "./components/Pricing";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Paket & Harga Jasa Website — Tyrexion",
  description: "Pilih paket landing page sesuai kebutuhan bisnis Anda, mulai dari Rp 300.000. Standard, Premium, dan Profesional — lengkap dengan garansi.",
};

export default function Paket() {
  return (
    <main className="overflow-x-hidden"  style={{marginTop: "80px"}}>
      <Pricing />

      <Footer />
    </main>
  )
}