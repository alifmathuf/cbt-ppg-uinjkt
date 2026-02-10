// 1. Ambil data dengan kunci yang konsisten
const userData = JSON.parse(localStorage.getItem('cbtUser')); 
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

// Cek apakah user sudah login
if (!userData) {
  alert('Data hasil tidak ditemukan');
  window.location.href = '/cbt-web-app/index.html';
}

// 2. Tampilkan Nama dan Kelas
// Pastikan di HTML ada id="namaPeserta"
const namaEl = document.getElementById('namaPeserta');
if (namaEl) {
  namaEl.innerText = `${userData.nama} (${userData.kelas})`;
}

// 3. Logika Menampilkan Skor PG
if (hasilPG) {
  document.getElementById('benar').innerText = hasilPG.benar;
  document.getElementById('total').innerText = hasilPG.total;
  document.getElementById('nilai').innerText = hasilPG.nilai;
  
  // Update Status Lulus
  const statusEl = document.getElementById('status');
  statusEl.innerText = hasilPG.nilai >= 75 ? '✅ LULUS PG' : '❌ BELUM LULUS PG';

  // UPDATE VISUAL LINGKARAN (Agar sesuai nilai asli)
  const ring = document.querySelector('.ring');
  if (ring) {
    ring.style.background = `conic-gradient(#22c55e 0% ${hasilPG.nilai}%, rgba(255,255,255,.15) ${hasilPG.nilai}%)`;
  }
}

// 4. Update Fungsi Export PDF agar sinkron
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(14);
  doc.text('HASIL UJIAN CBT', 20, y);
  y += 10;

  // Gunakan userData, bukan user (agar tidak null)
  doc.setFontSize(11);
  doc.text(`Nama: ${userData?.nama || '-'}`, 20, y); y += 6;
  doc.text(`Kelas: ${userData?.kelas || '-'}`, 20, y); y += 10;

  if (hasilPG) {
    doc.text('Pilihan Ganda', 20, y); y += 6;
    doc.text(`Nilai: ${hasilPG.nilai}`, 25, y); y += 10;
  }
  
  doc.save(`hasil_${userData?.nama || 'peserta'}.pdf`);
}
