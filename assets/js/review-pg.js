const jawabanUser = JSON.parse(localStorage.getItem('pg_jawaban') || '[]');
const soal = JSON.parse(localStorage.getItem('pg_soal') || '[]');
const opsi = JSON.parse(localStorage.getItem('pg_opsi') || '[]');
const kunci = JSON.parse(localStorage.getItem('pg_kunci') || '[]');

const tbody = document.getElementById('tabelJawaban');

if (!jawabanUser.length) {
  tbody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center">
        Data jawaban tidak ditemukan
      </td>
    </tr>
  `;
} else {
  jawabanUser.forEach((jawab, i) => {
    const benar = kunci[i] === jawab;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${soal[i] || '-'}</td>
        <td>
          ${opsi[i] ? opsi[i][jawab] : '-'}
        </td>
        <td>
          ${opsi[i] && kunci[i] != null ? opsi[i][kunci[i]] : '-'}
        </td>
        <td style="font-weight:700;color:${benar ? '#16a34a' : '#dc2626'}">
          ${benar ? 'Benar' : 'Salah'}
        </td>
      </tr>
    `;
  });
}
