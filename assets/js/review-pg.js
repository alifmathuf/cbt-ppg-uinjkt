const data = JSON.parse(localStorage.getItem('hasilPG'));
const tbody = document.getElementById('tabelJawaban');

if (!data) {
  tbody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center">
        Data jawaban tidak ditemukan
      </td>
    </tr>
  `;
} else {
  data.soal.forEach((soal, i) => {
    const benar = data.jawabanUser[i] === data.kunci[i];

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${soal}</td>
        <td>${data.jawabanUser[i]}</td>
        <td>${data.kunci[i]}</td>
        <td style="font-weight:700;color:${benar ? '#16a34a' : '#dc2626'}">
          ${benar ? 'Benar' : 'Salah'}
        </td>
      </tr>
    `;
  });
}
