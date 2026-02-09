import { shuffle } from "./randomize.js";

export async function loadPG(mapel, paket) {
  const res = await fetch(`data/pg/${mapel}/${paket}.json`);
  const data = await res.json();

  let soal = shuffle(data.soal);
  soal.forEach(s => s.opsi = shuffle(Object.entries(s.opsi)));

  return soal;
}
