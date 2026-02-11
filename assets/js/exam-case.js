/* ===============================
   CONFIG
================================ */
const DURASI = 30 * 60; // detik
const MIN_KATA = 150;
const TOTAL_STEP = 4;

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

// pilih 1 kasus acak (1 kali, tidak berubah)
const kasus = semuaKasus[Math.floor(Math.random() * semuaKasus.length)];

/* ===============================
   STATE
================================ */
let step = 0;
let waktu = DURASI;
let jawaban = Array(TOTAL_STEP).fill('');

/* ===============================
   ELEMENT
================================ */
const timerEl = document.getElementById('timer');
const judulKasusEl = document.getElementById('judulKasus');
const judulPertanyaanEl = document.getElementById('judulPertanyaan');
const jawabanEl = document.getElementById('jawaban');
const counterEl = document.getElementById('counter');
const progressFillEl = document.getElementById('progressFill');
const btnSelesaiEl = document.getElementById('btnSelesai');

/* ===============================
   INIT
================================ */
render();
startTimer();

/* ===============================
   TIMER
================================ */
function startTimer() {
  const interval = setInterval(() => {
    waktu--;

    if (waktu <= 0) {
      clearInterval(interval);
      selesai(true);
      return;
    }

    const menit = String(Math.floor(waktu / 60)).padStart(2, '0');
    const detik = String(waktu % 60).padStart(2, '0');
    timerEl.innerText = `${menit}:${detik}`;
  }, 1000);
}

/* ===============================
   RENDER UI
================================ */
function render() {
  judulKasusEl.innerText = `Studi Kasus: ${kasus.nama}`;
  judulPertanyaanEl.innerText =
    `(${step + 1}/${TOTAL_STEP}) ${kasus.pertanyaan[step]}`;

  jawabanEl.value = jawaban[step] || '';
  updateCounter();
  updateProgress();
}

/* ===============================
   COUNTER KATA
================================ */
jawabanEl.addEventListener('input', updateCounter);

function hitungKata(teks = '') {
  return teks.trim().split(/\s+/).filter(Boolean).length;
}

function updateCounter() {
  const jumlah = hitungKata(jawabanEl.value);
  counterEl.innerText = `${jumlah} / ${MIN_KATA} kata`;
}

/* ===============================
   NEXT STEP
================================ */
function next() {
  const jumlah = hitungKata(jawabanEl.value);

  if (jumlah < MIN_KATA) {
    alert(`Minimal ${MIN_KATA} kata`);
    return;
  }

  // simpan jawaban step sekarang
  jawaban[step] = jawabanEl.value.trim();
  step++;

  if (step >= TOTAL_STEP) {
    jawabanEl.disabled = true;
    btnSelesaiEl.disabled = false;
    updateProgress();
    return;
  }

  render();
}

/* ===============================
   PROGRESS BAR
================================ */
function updateProgress() {
  const persen = (step / TOTAL_STEP) * 100;
  progressFillEl.style.width = `${persen}%`;
}

/* ===============================
   SELESAI
================================ */
function selesai(auto = false) {
  if (!auto) {
    const yakin = confirm('Yakin ingin menyelesaikan studi kasus?');
    if (!yakin) return;
  }

  localStorage.setItem(
    'hasilCase',
    JSON.stringify({
      jenis: kasus.nama,
      jawaban,
      selesaiPada: new Date().toISOString()
    })
  );

  window.location.href = '/cbt-web-app/pages/result.html';
}
function exportCasePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const data = JSON.parse(localStorage.getItem('hasilCase'));

  if (!data) {
    alert('Jawaban studi kasus belum tersedia');
    return;
  }

  let y = 10;
  doc.setFontSize(14);
  doc.text(`Studi Kasus: ${data.jenis}`, 10, y);
  y += 10;

  doc.setFontSize(11);

  data.jawaban.forEach((jawab, i) => {
    doc.text(`Pertanyaan ${i + 1}`, 10, y);
    y += 7;

    doc.text(jawab || '-', 10, y, { maxWidth: 180 });
    y += 20;
  });

  doc.save(`studi-kasus-${data.jenis}.pdf`);
}
// WORD COUNTER (SAFE PATCH)
const textarea = document.getElementById("jawaban");
const counter = document.getElementById("counter");
const btnSelesai = document.getElementById("btnSelesai");
const MAX_KATA = 150;

if (textarea) {
  textarea.addEventListener("input", () => {
    const kata = textarea.value.trim().split(/\s+/).filter(Boolean);
    counter.textContent = `${kata.length} / ${MAX_KATA} kata`;

    if (kata.length >= MAX_KATA) {
      btnSelesai.disabled = false;
      counter.style.color = "#22c55e";
    } else {
      btnSelesai.disabled = true;
      counter.style.color = "";
    }
  });
}
