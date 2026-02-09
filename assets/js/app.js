/* =========================
   LOGIN
========================= */
function login() {
  const nama = document.getElementById('nama')?.value.trim();
  const kelas = document.getElementById('kelas')?.value.trim();

  if (!nama || !kelas) {
    alert('Nama dan kelas wajib diisi');
    return;
  }

  localStorage.setItem(
    'cbtUser',
    JSON.stringify({ nama, kelas })
  );

  // GitHub Pages path
  window.location.href = '/cbt-web-app/pages/dashboard.html';
}

/* =========================
   LOGOUT
========================= */
function logout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('cbtUser');
    window.location.href = '/cbt-web-app/index.html';
  }
}

/* =========================
   AUTO THEME BY TIME
========================= */
function autoThemeByTime() {
  const hour = new Date().getHours();

  if (hour >= 18 || hour < 6) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

/* =========================
   GREETING
========================= */
function applyGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let waktu = 'pagi';

  if (hour >= 12 && hour < 15) waktu = 'siang';
  else if (hour >= 15 && hour < 18) waktu = 'sore';
  else if (hour >= 18 || hour < 6) waktu = 'malam';

  greetingEl.innerText = `Assalaamualaikum, selamat ${waktu}`;
}

/* =========================
   LOAD USER INFO
========================= */
function loadUserInfo() {
  const userInfoEl = document.getElementById('userInfo');
  const user = JSON.parse(localStorage.getItem('cbtUser'));

  if (!user) {
    // kalau belum login, paksa balik
    window.location.href = '/cbt-web-app/index.html';
    return;
  }

  if (userInfoEl) {
    userInfoEl.innerText = `${user.nama} (${user.kelas})`;
  }
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  autoThemeByTime();
  applyGreeting();
  loadUserInfo();
});
