export const metadata = {
  title: "Syarat & Ketentuan — Tyrexion",
  description: "Syarat dan ketentuan penggunaan layanan Tyrexion.",
};

export default function SyaratKetentuanPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 800, marginTop: "80px"}}>
      <h1 className="fw-bold mb-2">Syarat & Ketentuan</h1>
      <p className="text-secondary mb-4">Terakhir diperbarui: 29 September 2026</p>

      <p>
        Dengan menggunakan layanan Tyrexion, Anda dianggap telah membaca,
        memahami, dan menyetujui syarat dan ketentuan berikut.
      </p>

      <h4 className="fw-bold mt-4">1. Layanan yang Disediakan</h4>
      <p>
        Tyrexion menyediakan jasa pembuatan website, dengan kategori awal
        berupa Landing Page. Kategori layanan lain dapat ditambahkan di
        kemudian hari.
      </p>

      <h4 className="fw-bold mt-4">2. Akun Pengguna</h4>
      <p>
        Untuk mengajukan project, Anda perlu masuk menggunakan akun Google.
        Anda bertanggung jawab menjaga keamanan akun Anda.
      </p>

      <h4 className="fw-bold mt-4">3. Proses Pengajuan</h4>
      <p>
        Setiap pengajuan project akan melalui tahap peninjauan oleh admin
        Tyrexion. Kami berhak menyetujui atau menolak pengajuan berdasarkan
        kapasitas layanan yang tersedia dan kesesuaian permintaan dengan
        paket yang dipilih.
      </p>

      <h4 className="fw-bold mt-4">4. Pembayaran</h4>
      <p>
        Pembayaran dilakukan dengan skema uang muka (DP) sebesar 50% di awal
        pengerjaan, dan pelunasan dilakukan setelah project selesai dan
        diserahkan. Detail pembayaran akan dikomunikasikan melalui WhatsApp
        setelah pengajuan disetujui.
      </p>

      <h4 className="fw-bold mt-4">5. Revisi dan Garansi</h4>
      <p>
        Setiap paket memiliki ketentuan jumlah revisi dan masa garansi
        perbaikan bug yang berbeda, sesuai dengan yang tercantum pada
        halaman Kategori Web. Garansi mencakup perbaikan bug pada fitur yang
        sudah disepakati, dan tidak mencakup permintaan desain atau fitur
        baru di luar cakupan paket yang dipilih.
      </p>

      <h4 className="fw-bold mt-4">6. Hosting</h4>
      <p>
        Website di-deploy ke akun hosting milik klien sendiri. Tyrexion
        hanya membantu proses pengaturan (setup). Klien bertanggung jawab
        atas syarat dan ketentuan layanan hosting yang digunakan.
      </p>

      <h4 className="fw-bold mt-4">7. Domain</h4>
      <p>
        Saat pemesanan, Anda dapat memilih menggunakan alamat gratis dari
        hosting, atau domain custom (seperti .my.id, .id, atau .com) sesuai
        pilihan yang tersedia untuk paket Anda. Biaya domain custom sudah
        termasuk dalam total harga yang dibayarkan dan berlaku untuk masa
        aktif satu tahun pertama.
      </p>
      <p>
        Perpanjangan domain pada tahun kedua dan seterusnya dilakukan sesuai
        pilihan yang Anda tentukan saat pemesanan: oleh Anda sendiri, atau
        oleh Tyrexion dengan biaya dan ketentuan yang akan dibicarakan
        secara terpisah melalui WhatsApp. Kepemilikan domain sepenuhnya ada
        di tangan Anda.
      </p>
      <p>
        Untuk kebutuhan domain di luar pilihan standar yang tersedia, admin
        dapat memberikan penawaran domain tambahan yang akan dikonfirmasi
        melalui dashboard Anda.
      </p>

      <h4 className="fw-bold mt-4">8. Pembatalan</h4>
      <p>
        Anda dapat membatalkan (menghapus) pengajuan yang masih berstatus
        "menunggu review" melalui dashboard. Pengajuan yang telah disetujui
        dan sedang dikerjakan tidak dapat dibatalkan secara sepihak melalui
        sistem.
      </p>

      <h4 className="fw-bold mt-4">9. Batasan Tanggung Jawab</h4>
      <p>
        Tyrexion tidak bertanggung jawab atas hasil bisnis (seperti
        peningkatan penjualan atau jumlah pelanggan) yang dipengaruhi oleh
        faktor di luar kendali kami, termasuk namun tidak terbatas pada
        strategi pemasaran, kualitas produk, dan kondisi pasar klien.
      </p>

      <h4 className="fw-bold mt-4">10. Perubahan Ketentuan</h4>
      <p>
        Kami dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu.
        Perubahan akan diinformasikan melalui halaman ini.
      </p>

      <h4 className="fw-bold mt-4">11. Kontak</h4>
      <p>
        Pertanyaan mengenai Syarat & Ketentuan ini dapat disampaikan melalui
        WhatsApp yang tersedia di website ini.
      </p>
    </div>
  );
}