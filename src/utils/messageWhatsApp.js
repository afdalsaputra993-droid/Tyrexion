const nomorWA = "6283830856078"; // ganti dengan nomor kamu

export function buatLinkWA(sumber, namaPaket = null) {
  let pesan = `Halo Tyrexion\n\n`;

  if (sumber === "paket" && namaPaket) {
    pesan += `Saya tertarik dengan Paket *${namaPaket}*.\n\n`;
    pesan += `Nama: \nJenis bisnis: \nKebutuhan website: \n\n`;
    pesan += `Boleh dibantu info lebih lanjut?`;
  } else if (sumber === "konsultasi") {
    pesan += `Saya tertarik konsultasi soal pembuatan website untuk bisnis saya.\n\n`;
    pesan += `Nama: \nJenis bisnis: \nKebutuhan website: \n\n`;
    pesan += `Mohon info lebih lanjut ya`;
  } else {
    pesan += `Saya ingin bertanya-tanya seputar layanan Tyrexion.\n\nTerima kasih`;
  }

  return `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
}