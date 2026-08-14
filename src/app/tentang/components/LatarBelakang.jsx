"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    id: 1,
    icon: "bi bi-lightbulb-fill",
    judul: "Berawal dari Kebutuhan Nyata",
    desk: "Melihat banyak bisnis di sekitar yang kesulitan berkembang karena belum punya kehadiran digital, muncul dorongan untuk mulai belajar web development."
  },
  {
    id: 2,
    icon: "bi bi-laptop-fill",
    judul: "Proyek Pertama",
    desk: "Mulai praktik nyata lewat proyek-proyek awal, belajar langsung dari proses membangun website dari nol hingga jadi."
  },
  {
    id: 3,
    icon: "bi bi-stars",
    judul: "Lahirnya Tyrexion",
    desk: "Dari semangat Try, Expand, and Action — mencoba, memperluas, dan bertindak — nama Tyrexion pun lahir sebagai identitas dari perjalanan ini."
  },
  {
    id: 4,
    icon: "bi bi-rocket-takeoff-fill",
    judul: "Terus Bertumbuh Bersama Klien",
    desk: "Kini, Tyrexion fokus membantu semakin banyak bisnis menemukan potensi digitalnya, satu website, satu langkah nyata."
  }
]

// Varian biar rapi
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25 // tiap item delay 0.25s
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const iconAnim = {
  hidden: { scale: 0, rotate: -180 },
  show: { 
    scale: 1, 
    rotate: 0, 
    transition: { duration: 0.5, ease: "backOut" } // efek mantul dikit
  }
};

export default function LatarBelakang() {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        
        {/* HEADLINE */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }} // animasi cuma 1x
        >
          <h2 className="fw-bold text-secondary">Perjalanan Awal Tyrexion</h2>
          <p className="text-muted">Dari masalah sampai jadi solusi. Ini cerita singkatnya.</p>
        </motion.div>

        {/* TIMELINE WRAPPER */}
        <motion.div 
          className="timeline position-relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }} // mulai animasi pas 20% keliatan
        >
          
          {timelineData.map((itemData) => (
            <motion.div 
              key={itemData.id} 
              className="timeline-item d-flex mb-5"
              variants={item}
            >
              
              {/* ICON */}
              <motion.div 
                className="timeline-icon flex-shrink-0"
                variants={iconAnim}
              >
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                     style={{ width: "60px", height: "60px" }}>
                  <i className={`${itemData.icon} fs-4`}></i>
                </div>
              </motion.div>

              {/* CONTENT / CARD */}
              <motion.div 
                className="timeline-content ms-4 p-4 bg-white rounded-4 border"
                variants={item}
              >
                <h3 className="fw-bold fs-5 text-dark mb-2">{itemData.judul}</h3>
                <p className="text-secondary mb-0">{itemData.desk}</p>
              </motion.div>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  )
}