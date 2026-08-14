const card = [
  {
    icon: "bi-people-fill",
    judul: "Jangkau Lebih Banyak Pelanggan",
    desk: "Bisnis Anda nggak lagi terbatas di sekitar toko — website membuka jalan ke pelanggan baru dari mana saja."
  },
  {
    icon: "bi-graph-up-arrow",
    judul: "Selangkah di Depan Kompetitor",
    desk: "Saat kompetitor masih mengandalkan cara lama, bisnis Anda sudah tampil lebih modern dan siap bersaing."
  },
  {
    icon: "bi-clock-history",
    judul: "Buka 24 Jam Tanpa Lelah",
    desk: "Website Anda tetap aktif melayani informasi dan pelanggan, bahkan saat toko tutup atau Anda sedang istirahat."
  },
  {
    icon: "bi-patch-check-fill",
    judul: "Tampil Lebih Profesional & Terpercaya",
    desk: "Kesan pertama menentukan segalanya — website yang rapi membuat calon pelanggan lebih yakin memilih Anda."
  }
]

export default function Keuntungan() {
  return (
    <section className="py-5">
      <div className="container">

        {/* Headline */}
        <div className="text-center mb-5">
         <h2 className="fw-bold text-secondary">Apa Untungnya Punya Website untuk Bisnis Anda?</h2>
        </div>
        
        <div className="row g-5">
           {card.map((item, id) => (
            <div key={id} className="col-12">
              <div className="p-3 h-100">
                <div className="d-flex align-items-start gap-3">
                  
                  {/* Icon Badge */}
                  <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 bg-primary bg-gradient text-white" 
                       style={{width: "52px", height: "52px"}}>
                    <i className={`bi ${item.icon} fs-3`}></i>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="fw-bold fs-5 mb-2 text-dark">
                      {item.judul}
                    </h3>
                    <p className="text-secondary mb-0">
                      {item.desk}
                    </p>
                  </div>

                </div>
              </div>
           </div>
           ))}
        </div>
      </div>
    </section>
  )
}