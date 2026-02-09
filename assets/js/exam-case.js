/* ===============================
   CONFIG
================================ */
const DURASI = 30 * 60;
const MIN_KATA = 150;

/* ===============================
   DATA STUDI KASUS (ACAK 1)
================================ */
const semuaKasus = [
  {
    nama: 'Strategi Pembelajaran',
    pertanyaan: [
      'Deskripsi masalah/kasus nyata',
      'Upaya penyelesaian',
      'Hasil yang didapat',
      'Hikmah/pengalaman berharga'
    ]
  },
  {
    nama: 'Media Pembelajaran',
    pertanyaan: [
      'Deskripsi masalah/kasus nyata',
      'Upaya penyelesaian',
      'Hasil yang didapat',
      'Hikmah/pengalaman berharga'
    ]
  },
  {
    nama: 'LKPD',
    pertanyaan: [
      'Deskripsi masalah/kasus nyata',
      'Upaya penyelesaian',
      'Hasil yang didapat',
      'Hikmah/pengalaman berharga'
    ]
  },
  {
    nama: 'Penilaian',
    pertanyaan: [
      'Deskripsi masalah/kasus nyata',
      'Upaya penyelesaian',
      'Hasil yang didapat',
      'Hikmah/pengalaman berharga'
    ]
  }
];

// PILIH 1 KASUS ACAK
const kasus = semuaKasus[Math.floor(Math.random() * semuaKasus.length)];

/* ===============================
   STATE
================================ */
let step = 0;
let waktu = DURASI;
let jawaban = ['', '', '', ''];

/* ===============================
   TIMER
================================ */
setInterval(() => {
  waktu--;
  if (waktu <= 0) selesai(true);

  const m = String(Math.floor(waktu / 60)).padStart(2, '0');
  const s = String(waktu % 60).padStart(2, '0');
  timer.innerText = `${m}:${s}`;
}, 1000);

/* ===============================
   RENDER
================================ */
function render() {
  judulKasus.innerText = `Studi Kasus: ${kasus.nama}`;
  judulPertanyaan.innerText =
    `(${step + 1}/4) ${kasus.pertanyaan[step]}`;

  jawabanEl.value = jawaban[step];
  updateCounter();
  updateProgress();
}

const jawabanEl = document.getElementById('jawaban');
const counter = document.getElementById('counter');
const progressFill = document.getElementById('progressFill');
const btnSelesai = document.getElementById('btnSelesai');

render();

/* ===============================
   COUNTER KATA REALTIME
================================ */
jawabanEl.addEventListener('input', updateCounter);

function hitungKata(teks) {
  return teks.trim().split(/\s+/).filter(Boolean).length;
}

function updateCounter() {
  const jumlah = hitungKata(jawabanEl.value);
  counter.innerText = `${jumlah} / ${MIN_KATA} kata`;
}

/* ===============================
   NEXT STEP
================================ */
function next() {
  const jumlah = hitungKata(jawabanEl.value);
  if (jumlah < MIN_KATA) {
    alert('Minimal 150 kata');
    return;
  }

  jawaban[step] = jawabanEl.value;
  step++;

  if (step >= 4) {
    btnSelesai.disabled = false;
    jawabanEl.disabled = true;
    return;
  }

  render();
}

/* ===============================
   PROGRESS
================================ */
function updateProgress() {
  progressFill.style.width = `${(step / 4) * 100}%`;
}

/* ===============================
   SELESAI
================================ */
function selesai(auto = false) {
  if (!auto && !confirm('Yakin ingin menyelesaikan studi kasus?')) return;

  localStorage.setItem('hasilCase', JSON.stringify({
    jenis: kasus.nama,
    jawaban
  }));

  window.location.href = '/cbt-web-app/pages/result.html';
}
