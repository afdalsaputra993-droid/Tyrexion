

export default function Garansi() {
  return (
    <section className="py-3">
      <div className="container">
{/* HEADLINE */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-secondary">Bergaransi, Bukan Sekadar Janji</h2>
        </div>

        <div className="p-3 d-flex flex-column gap-1 justify-content-center align-items-center">
        <div className="d-flex align-items-center justify-content-center rounded-circle bg-warning  text-secondary shadow"
                     style={{ width: "60px", height: "60px" }}>
        <span className="bi bi-shield-fill-check fs-4"></span>
        </div>

          <div className="shadow card border-0 bg-white rounded-4 d-flex flex-column gap-3 justify-content-center align-items-center p-4">
          <p className="text-center">Setiap website dilindungi garansi revisi dan perbaikan bug sesuai masa berlaku paket yang Anda pilih.</p>
          </div>
        </div>
      </div>
    </section>
  )
}