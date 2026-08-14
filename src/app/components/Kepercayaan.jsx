const card = [
  {
    icon: "bi-clipboard-data",
    judul: "Progress Selalu Transparan",
    desk: "Anda selalu tahu sejauh mana website Anda dikerjakan, lewat update berkala tanpa perlu bertanya-tanya."
  },
  {
    icon: "bi-bug-fill",
    judul: "Garansi Revisi & Perbaikan",
    desk: "Ada bug atau butuh sedikit penyesuaian? Kami tanggung jawab penuh dalam masa garansi, tanpa biaya tambahan."
  },
  {
    icon: "bi-shield-check",
    judul: "Diuji Sebelum Diserahkan",
    desk: "Setiap website melalui proses uji coba menyeluruh sebelum sampai ke tangan Anda — bukan asal jadi, tapi benar-benar siap pakai."
  },
  {
    icon: "bi-globe2",
    judul: "Domain Sepenuhnya Milik Anda",
    desk: "Domain website di-setup langsung di akun Anda sendiri — kendali penuh ada di tangan Anda, bukan kami."
  }
]

export default function Kepercayaan() {
  return (
    <div className="mt-5">
      <div className="container">

        {/* Headline */}
        <div className="text-center mb-5">
         <h2 className="fw-bold text-secondary">Kenapa Harus Percaya Tyrexion?</h2>
        </div>
        
         <div className="row g-4">
           {card.map((item, id) => (
            <div key={id} className="col-12 mx-auto col-md-6">
              <div className="card h-100 border-0 shadow-sm shadow-lg-hover bg-gradient rounded-4 p-4 transition">
                <div className="d-flex flex-column gap-3">
                  
                  {/* Icon Badge */}
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-gradient text-white" style={{width: "56px", height: "56px"}}>
                    <i className={`bi ${item.icon} fs-3`}></i>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="fw-bold fs-5 mb-2 text-dark">
                      {item.judul}
                    </h3>
                    <p className="text-secondary mb-0 lh-lg">
                      {item.desk}
                    </p>
                  </div>

                </div>
              </div>
           </div>
           ))}
         </div>
      </div>
    </div>
  )
}