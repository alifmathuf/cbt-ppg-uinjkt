export function hitungKata(teks) {
  return teks.trim().split(/\s+/).length;
}

export function validasi(textarea) {
  return hitungKata(textarea.value) >= 150;
}
