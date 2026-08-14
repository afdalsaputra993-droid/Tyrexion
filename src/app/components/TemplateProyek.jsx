import Image from "next/image";
import Link from "next/link";

const template = [
  {
    src: "/images/glowskin.jpg",
    width: 863,
    height: 406,
    judul: "Glowskin — Skincare Brand",
    desk: "Landing page produk skincare, dirancang untuk memperkenalkan produk dan menarik minat calon pembeli.",
    kategori: "Landing Page — Produk",
    link: "https://glowskin-tyrexion.vercel.app/"
  },
  {
    src: "/images/Kopi.jpg",
    width: 791,
    height: 370,
    judul: "Kopi",
    desk: "Landing page produk kopi, menampilkan cerita dan keunggulan produk untuk menjangkau lebih banyak penikmat kopi.",
    kategori: "Landing Page — Produk",
    link: "https://landing-page1-brown.vercel.app/"
  },
  {
    src: "/images/wedding.jpg",
    width: 1023,
    height: 394,
    judul: "Undangan Pernikahan Digital",
    desk: "Landing page undangan pernikahan yang elegan, memperkenalkan momen spesial pengantin kepada tamu undangan secara digital.",
    kategori: "Landing Page — Undangan",
    link: "https://wedding-six-iota-32.vercel.app/"
  }
]

export default function TemplateProyek() {
  return (
    <section className="mt-5">
      <div className="container">

        {/* HEADLINE */}
         <div className="text-center mb-5">
           <h2 className="fs-1 text-secondary fw-bold">Beberapa Website yang Sudah Kami Buat</h2>
           
         </div>

        <div className="row g-3 p-3">
          {template.map((item, id) => (
      <div key={id} className="col-12 col-md-6 col-lg-4">
            <Link href={item.link} className="card shadow rounded-3 border-0 bg-white h-100 text-decoration-none">
               <Image src={item.src}
                 alt="gambar"
                 width={item.width}
                 height={item.height}
                 className="card-img-top img-fluid"/>

              <div className="card-title d-flex justify-content-between">
                <div className="p-3">
                  <h3 className="text-secondary fw-bold fs-4">{item.judul}</h3>
                  <p className="text-muted">
                    {item.desk}
                  </p>
                </div>

                <p className="text-center text-primary fw-bold p-3">{item.kategori}</p>
              </div>
              
            </Link>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}