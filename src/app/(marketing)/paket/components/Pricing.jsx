"use client";
import { motion } from "framer-motion";
import { buatLinkWA } from "@/utils/messageWhatsApp";

const plans = [
  {
    name: "Standard",
    price: "350.000",
    originalPrice: "500.000", // dibalik biar masuk akal
    features: [
      "1 halaman (single page)",
      "Desain dari template pilihan",
      "1x revisi",
      "Garansi bug 1 bulan"
    ],
    cta: "Pilih Paket Ini",
    popular: false,
    link: buatLinkWA("paket", "Standard") // langsung fungsi, ga pake href=
  },
  {
    name: "Premium",
    price: "700.000",
    originalPrice: "950.000",
    features: [
      "Desain semi-custom (template + penyesuaian)",
      "Section lebih lengkap",
      "2-3x revisi",
      "Garansi bug 1-2 bulan"
    ],
    cta: "Pilih Paket Ini",
    popular: true,
    link: buatLinkWA("paket", "Premium") // ditambahin
  },
  {
    name: "Profesional",
    price: "1.500.000",
    originalPrice: "2.000.000",
    features: [
      "Desain full custom",
      "Halaman lebih banyak/kompleks",
      "Revisi lebih fleksibel",
      "Garansi bug hingga 2 bulan",
      "Prioritas pengerjaan"
    ],
    cta: "Konsultasi Gratis",
    popular: false,
    link: buatLinkWA("paket", "Profesional") // ditambahin
  }
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Pricing() {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        
        {/* HEADLINE */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-secondary">Pilih Paket yang Sesuai Kebutuhan Bisnismu</h2>
          <p className="text-muted">Semua paket sudah termasuk maintenance.</p>
        </div>

        {/* CARDS */}
        <motion.div 
          className="row g-4 justify-content-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} className="col-12 col-md-4 d-flex" variants={item}>
              <div className={`card w-100 border-0 shadow-sm rounded-4 position-relative ${plan.popular ? 'border border-2 border-primary' : ''}`}>
                
                {/* Badge Populer */}
                {plan.popular && (
                  <span className="position-absolute top-0 start-50 translate-middle badge bg-primary rounded-pill px-3 py-2">
                    Paling Populer
                  </span>
                )}

                <div className="card-body p-4 p-md-5 d-flex flex-column">
                  
                  {/* Judul */}
                  <h3 className="fw-bold text-center mb-3">{plan.name}</h3>

                  {/* Harga */}
                  <div className="text-center mb-4">
                    <div className="text-muted text-decoration-line-through small">Rp {plan.originalPrice}</div>
                    <div className="fs-2 fw-bold text-success">Rp {plan.price}</div>
                    <small className="text-muted">/ sekali bayar</small>
                  </div>

                  {/* Fitur */}
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="mb-2 d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success mt-1"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tombol */}
                  <a 
                    href={plan.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn w-100 fw-semibold ${plan.popular ? 'btn-primary' : 'btn-outline-primary'}`}
                  >
                    {plan.cta}
                  </a>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}