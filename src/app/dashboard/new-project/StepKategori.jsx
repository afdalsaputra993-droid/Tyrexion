'use client'; // Wajib untuk Framer Motion & Interaksi

import { motion } from 'framer-motion';

export default function StepKategori({ onNext }) {
  
  const categories = [
    {
      id: 'landing_page',
      title: 'Landing Page',
      desc: 'Halaman tunggal fokus pada konversi & promosi.',
      icon: 'bi-easel',
      available: true,
    },
    {
      id: 'portfolio',
      title: 'Portofolio',
      desc: 'Galeri elegan untuk menampilkan karya terbaik.',
      icon: 'bi-briefcase',
      available: false,
    }
  ];

  const containerVars = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
  };
  
  const itemVars = { 
    hidden: { y: 20, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } 
  };

  return (
    <motion.div className="container py-4" variants={containerVars} initial="hidden" animate="visible">
      
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6 text-primary">Pilih Kategori Website</h2>
        <p className="text-muted lead">Silakan pilih jenis website yang ingin Anda bangun.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {categories.map((cat) => (
          <div key={cat.id} className="col-md-6 col-lg-5">
            <motion.div
              variants={itemVars}
              whileHover={cat.available ? { scale: 1.03, translateY: -5 } : {}}
              whileTap={cat.available ? { scale: 0.98 } : {}}
              onClick={() => cat.available && onNext(cat.id)}
              className={`card h-100 border-0 shadow-sm position-relative overflow-hidden ${!cat.available ? 'opacity-75' : ''}`}
              style={{ 
                cursor: cat.available ? 'pointer' : 'not-allowed',
                background: cat.available ? 'linear-gradient(145deg, #ffffff, #f8f9fa)' : '#f8f9fa'
              }}
            >
              <div className="card-body p-4 d-flex flex-column align-items-center text-center">
                <div className={`p-3 rounded-circle mb-3 ${cat.available ? 'bg-primary bg-opacity-10 text-primary' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                  <i className={`bi ${cat.icon} fs-1`}></i>
                </div>

                <h4 className="card-title fw-bold mb-2">{cat.title}</h4>
                <p className="card-text text-muted small mb-3">{cat.desc}</p>
                
                <span className={`badge mt-auto ${cat.available ? 'bg-success' : 'bg-secondary'}`}>
                  {cat.available ? 'Tersedia' : 'Akan Datang'}
                </span>

                {!cat.available && (
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-warning text-dark">Segera</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
