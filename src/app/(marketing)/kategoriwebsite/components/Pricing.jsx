"use client";
import { motion } from "framer-motion";
import { buatLinkWA } from "@/utils/messageWhatsApp";

// DATA HANYA 2 KATEGORI
const categories = [
  {
    id: 'landing_page',
    title: 'Landing Page',
    desc: 'Halaman tunggal fokus pada konversi & promosi.',
    icon: 'bi-easel',
    available: true,
    link: buatLinkWA("kategori", "Landing Page")
  },
  {
    id: 'wedding',
    title: 'Undangan Pernikahan',
    desc: 'Solusi undangan pernikahan digital premium dengan manajemen tamu, konfirmasi kehadiran, integrasi peta lokasi, dan galeri momen.',
    icon: 'bi-envelope-paper-heart',
    available: false, // Di-set false sesuai contoh referensi (Akan Datang)
    link: '#'
  }
]

const containerVars = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

const itemVars = { 
  hidden: { y: 20, opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } 
};

export default function Pricing() {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        
        {/* HEADLINE */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-primary">Pilih Kategori Website</h2>
          <p className="text-muted lead">Silakan pilih jenis website yang ingin Anda bangun.</p>
        </div>

        {/* GRID KATEGORI */}
        <motion.div 
          className="row g-4 justify-content-center"
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <div key={cat.id} className="col-md-6 col-lg-5">
              
              {/* Logic Tampilan: Jika Available pakai Link, jika tidak pakai Div */}
              {cat.available ? (
                <motion.a
                  href={cat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVars}
                  whileHover={{ scale: 1.03, translateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="card h-100 border-0 shadow-sm position-relative overflow-hidden text-decoration-none"
                  style={{ 
                    cursor: 'pointer',
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <CategoryContent cat={cat} />
                </motion.a>
              ) : (
                <motion.div
                  variants={itemVars}
                  className="card h-100 border-0 shadow-sm position-relative overflow-hidden opacity-75"
                  style={{ 
                    cursor: 'not-allowed',
                    background: '#f8f9fa'
                  }}
                >
                  <CategoryContent cat={cat} />
                </motion.div>
              )}

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// Komponen Isi Kartu (Agar kode lebih rapi dan tidak duplikat)
function CategoryContent({ cat }) {
  return (
    <div className="card-body p-4 d-flex flex-column align-items-center text-center">
      
      {/* Icon Wrapper */}
      <div className={`p-3 rounded-circle mb-3 ${cat.available ? 'bg-primary bg-opacity-10 text-primary' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
        <i className={`bi ${cat.icon} fs-1`}></i>
      </div>

      {/* Title */}
      <h4 className="card-title fw-bold mb-2">{cat.title}</h4>
      
      {/* Description */}
      <p className="card-text text-muted small mb-3 flex-grow-1">
        {cat.desc}
      </p>
      
      {/* Badge Status */}
      <span className={`badge mt-auto px-3 py-2 ${cat.available ? 'bg-success bg-opacity-10 text-success border border-success' : 'bg-secondary text-white'}`}>
        {cat.available ? 'Tersedia' : 'Akan Datang'}
      </span>

      {/* Badge Segera (Muncul jika tidak available) */}
      {!cat.available && (
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-warning text-dark">Segera</span>
        </div>
      )}
    </div>
  );
}
