let soal = [];
let index = 0;
let jawaban = [];
let waktu = 120 * 60; // 120 menit

// AMBIL MAPEL
const mapel = localStorage.getItem('mapel') || 'qurdist';

// LOAD SOAL
fetch(`/cbt-web-app/data/${mapel}.json`)
  .then(res => res.json())
  .then(data => {
    soal = data.questions;
    initGrid();
    tampilSoal();
  });

// TIMER
setInterval(() => {
  if (waktu <= 0) selesaiUjian(true);
  waktu--;

  const m = String(Math.floor(waktu / 60)).padStart(2, '0');
  const s = String(waktu % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `${m}:${s}`;
}, 1000);

// TAMPIL SOAL
function tampilSoal() {
  const q = soal[index];
  document.getElementById('noSoal').innerText = `Soal ${index + 1}`;
  document.getElementById('pertanyaan').innerText = q.q;

  const opsi = document.getElementById('opsi');
  opsi.innerHTML = '';

  q.options.forEach((o, i) => {
    const checked = jawaban[index] === i ? 'checked' : '';
    opsi.innerHTML += `
      <label>
        <input type="radio" name="opsi" ${checked}
          onchange="pilih(${i})"> ${o}
      </label>`;
  });

  updateProgress();
}

// PILIH JAWABAN
function pilih(i) {
  jawaban[index] = i;
  document.querySelectorAll('.soal-grid button')[index]
    .classList.add('answered');

  if (index === soal.length - 1) {
    document.getElementById('btnSelesai').disabled = false;
  }
}

// NAVIGASI
function nextSoal() {
  if (index < soal.length - 1) {
    index++;
    tampilSoal();
  }
}

function prevSoal() {
  if (index > 0) {
    index--;
    tampilSoal();
  }
}

// GRID
function initGrid() {
  const grid = document.getElementById('soalGrid');
  grid.innerHTML = '';
  soal.forEach((_, i) => {
    const b = document.createElement('button');
    b.innerText = i + 1;
    b.onclick = () => {
      index = i;
      tampilSoal();
    };
    grid.appendChild(b);
  });
}

// PROGRESS
function updateProgress() {
  const done = jawaban.filter(v => v !== undefined).length;
  document.getElementById('progressText').innerText =
    `${done} / ${soal.length}`;
  document.getElementById('progressFill').style.width =
    `${(done / soal.length) * 100}%`;
}

// SELESAI
function selesaiUjian(auto = false) {
  if (!auto && !confirm('Yakin ingin menyelesaikan ujian?')) return;
  localStorage.setItem('jawabanPG', JSON.stringify(jawaban));
  window.location.href = '/cbt-web-app/pages/result.html';
}
