export function skorPG(jawaban, kunci) {
  let benar = 0;
  jawaban.forEach((j, i) => {
    if (j === kunci[i]) benar++;
  });
  return (benar / kunci.length) * 100;
}
