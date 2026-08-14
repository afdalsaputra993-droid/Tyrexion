
import { buatLinkWA } from "@/utils/messageWhatsApp"

export default function ButtonNav() {
  

  return (
    <a 
      href={buatLinkWA("konsultasi")} 
      target="_blank" 
      className="d-none btn btn-accent-cta rounded-pill btn-md fw-bold d-md-flex gap-2"
    >
      <span className="bi bi-whatsapp"></span>
      WHATSAPP
    </a>
  )
}