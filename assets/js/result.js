const user = JSON.parse(localStorage.getItem('cbtUser'));
const hasilPG = JSON.parse(localStorage.getItem('hasilPG'));
const hasilCase = JSON.parse(localStorage.getItem('hasilCase'));

if (!user || (!hasilPG && !hasilCase)) {
  alert('Data hasil tidak ditemukan');
  window.location.href = '/cbt-web-app/index.html';
}

// USER
document.getElementById('namaPeserta').innerText =
  `${user.nama} (${user.kelas})`;

// ===== PG =====
if (hasilPG) {
  document.getElementById('benar').innerText = hasilPG.benar;
  document.getElementById('total').innerText = hasilPG.total;
  document.getElementById('nilai').innerText = hasilPG.nilai;
  document.getElementById('status').innerText =
    hasilPG.nilai >= 75 ? '✅ LULUS PG' : '❌ BELUM LULUS PG';

  const ctx = document.getElementById('chartNilai');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Benar', 'Salah'],
      datasets: [{
        data: [hasilPG.benar, hasilPG.total - hasilPG.benar]
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// ===== STUDI KASUS (DETAIL) =====
if (hasilCase) {
  const wrap = document.getElementById('caseResult');

  let html = `
    <div class="card">
      <h3>Hasil Studi Kasus</h3>
      <p><b>Jenis:</b> ${hasilCase.jenis}</p>
    </div>
  `;

  hasilCase.jawaban.forEach((teks, i) => {
    const kata = teks.trim().split(/\s+/).filter(Boolean).length;
    const karakter = teks.length;

    html += `
      <div class="card">
        <h4>Jawaban ${i + 1}</h4>
        <p>Jumlah kata: <b>${kata}</b></p>
        <p>Jumlah karakter: <b>${karakter}</b></p>
      </div>
    `;
  });

  wrap.innerHTML = html;
}

function kembali() {
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}

function exportPDF() {
  alert('Export PDF akan diaktifkan di step berikutnya');
}
