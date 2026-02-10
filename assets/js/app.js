function login() {
  const nama = document.getElementById('nama').value.trim();
  const kelas = document.getElementById('kelas').value.trim();

  if (!nama || !kelas) {
    alert('Nama dan kelas wajib diisi');
    return;
  }

  localStorage.setItem('cbtUser', JSON.stringify({
    nama,
    kelas
  }));

  // ABSOLUTE PATH
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}
function logout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.clear();
    window.location.href = '../index.html';
  }
}
function greetingByTime() {
  const hour = new Date().getHours();
  let waktu = 'pagi';

  if (hour >= 12 && hour < 15) waktu = 'siang';
  else if (hour >= 15 && hour < 18) waktu = 'sore';
  else if (hour >= 18 || hour < 6) waktu = 'malam';

  return `Assalaamualaikum, selamat ${waktu}`;
}
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const greetEl = document.getElementById('greeting');

  if (greetEl && user) {
    greetEl.textContent = `${greetingByTime()}, ${user.nama}`;
  }
});
