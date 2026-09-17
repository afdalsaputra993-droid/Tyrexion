export default function KebijakanPrivasiPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <h1 className="fw-bold mb-2">Kebijakan Privasi</h1>
      <p className="text-secondary mb-4">Terakhir diperbarui: 17 September 2026</p>

      <p>
        Tyrexion ("kami") menghargai privasi Anda. Kebijakan ini menjelaskan
        data pribadi apa saja yang kami kumpulkan, bagaimana data tersebut
        digunakan, dan hak Anda terkait data tersebut.
      </p>

      <h4 className="fw-bold mt-4">1. Data yang Kami Kumpulkan</h4>
      <p>Saat Anda menggunakan layanan Tyrexion, kami dapat mengumpulkan:</p>
      <ul>
        <li>Nama lengkap dan alamat email (diperoleh melalui login Google)</li>
        <li>Foto profil (diperoleh melalui login Google)</li>
        <li>Nomor WhatsApp yang Anda cantumkan saat mengajukan project</li>
        <li>
          Data formulir pengajuan project, meliputi: nama bisnis, kategori
          bisnis, target konsumen, preferensi warna, section website yang
          dipilih, deskripsi kebutuhan, link referensi desain, dan catatan
          tambahan
        </li>
      </ul>

      <h4 className="fw-bold mt-4">2. Cara Kami Menggunakan Data</h4>
      <p>Data yang dikumpulkan digunakan untuk:</p>
      <ul>
        <li>Memproses dan meninjau pengajuan pembuatan website Anda</li>
        <li>Menghubungi Anda melalui WhatsApp terkait progres project</li>
        <li>Menampilkan riwayat dan status project pada dashboard akun Anda</li>
        <li>Meningkatkan kualitas layanan kami</li>
      </ul>

      <h4 className="fw-bold mt-4">3. Penyimpanan Data</h4>
      <p>
        Data Anda disimpan secara aman menggunakan layanan database pihak
        ketiga (Supabase). Kami menerapkan kontrol akses sehingga data
        pribadi Anda hanya dapat diakses oleh Anda sendiri dan administrator
        Tyrexion yang berwenang.
      </p>

      <h4 className="fw-bold mt-4">4. Pihak Ketiga</h4>
      <p>Kami menggunakan layanan pihak ketiga berikut:</p>
      <ul>
        <li><strong>Google OAuth</strong> — untuk proses autentikasi/login</li>
        <li><strong>Supabase</strong> — untuk penyimpanan data dan autentikasi</li>
        <li><strong>WhatsApp</strong> — untuk komunikasi terkait project Anda</li>
      </ul>
      <p>
        Kami tidak menjual atau membagikan data pribadi Anda kepada pihak
        ketiga untuk tujuan pemasaran.
      </p>

      <h4 className="fw-bold mt-4">5. Hak Anda</h4>
      <p>Anda memiliki hak untuk:</p>
      <ul>
        <li>Mengakses dan melihat data project yang Anda ajukan melalui dashboard</li>
        <li>Menghapus pengajuan project yang masih berstatus "menunggu review", "ditolak", atau "kadaluarsa"</li>
        <li>Meminta penghapusan akun dan data terkait dengan menghubungi kami langsung</li>
      </ul>

      <h4 className="fw-bold mt-4">6. Cookie</h4>
      <p>
        Kami menggunakan cookie sesi untuk menjaga status login Anda selama
        menggunakan layanan. Cookie ini bersifat esensial dan tidak digunakan
        untuk pelacakan iklan.
      </p>

      <h4 className="fw-bold mt-4">7. Perubahan Kebijakan</h4>
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
        Perubahan akan diinformasikan melalui halaman ini.
      </p>

      <h4 className="fw-bold mt-4">8. Kontak</h4>
      <p>
        Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan
        hubungi kami melalui WhatsApp yang tersedia di website ini.
      </p>
    </div>
  );
}