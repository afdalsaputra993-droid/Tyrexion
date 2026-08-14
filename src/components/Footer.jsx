import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white-50 pt-5 pb-4 mt-5 w-100">
      <div className="container-fluid px-0"> {/* <-- Ganti ini */}
        
        <div className="row gx-0 w-100 gy-4 px-3"> {/* <-- Tambah px-3 biar ada jarak isi */}
          
          {/* Kolom 1: Brand */}
          <div className="col-12 col-lg-4 px-3">
            <h3 className="text-white fw-bold mb-3">Tyrexion</h3>
            <p className="mb-3">
              Jasa pembuatan website profesional untuk UMKM & bisnis. Tampil online, dipercaya pelanggan.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-whatsapp"></i></a>
              <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="col-6 col-lg-2 px-3">
            <h5 className="text-white fw-bold mb-3">Navigasi</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="text-white-50 text-decoration-none">Beranda</Link></li>
              <li className="mb-2"><Link href="/tentang" className="text-white-50 text-decoration-none">Tentang</Link></li>
              <li className="mb-2"><Link href="/paket" className="text-white-50 text-decoration-none">Paket</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan */}
          <div className="col-6 col-lg-3 px-3">
            <h5 className="text-white fw-bold mb-3">Layanan</h5>
            <ul className="list-unstyled">
              <li className="mb-2">Website Company Profile</li>
              <li className="mb-2">Website Toko Online</li>
              <li className="mb-2">Landing Page</li>
              <li className="mb-2">Maintenance & SEO</li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="col-12 col-lg-3 px-3">
            <h5 className="text-white fw-bold mb-3">Hubungi Kami</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt-fill text-primary mt-1"></i>
                <span>Tegal, Jawa Tengah, Indonesia</span>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-envelope-fill text-primary mt-1"></i>
                <a href="mailto:hello.tyrexion@gmail.com" className="text-white-50 text-decoration-none">hello.tyrexion@gmail.com</a>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2">
                <i className="bi bi-telephone-fill text-primary mt-1"></i>
                <a href="tel:08123456789" className="text-white-50 text-decoration-none">083830856078</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <hr className="border-secondary mt-4 mb-3 mx-3" /> {/* <-- Tambah mx-3 */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3"> {/* <-- Tambah px-3 */}
          <p className="mb-2 mb-md-0 small">
            © {new Date().getFullYear()} Tyrexion. All rights reserved.
          </p>
          <div className="d-flex gap-3 small">
            <Link href="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link>
            <Link href="/terms" className="text-white-50 text-decoration-none">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}