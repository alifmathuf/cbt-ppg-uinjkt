import { State } from "./store/state.js";
import { avatar } from "./avatar.js";

const state = State.get();

document.getElementById("username").textContent =
  state.user?.name || "Peserta";

document.getElementById("avatar").src =
  avatar(state.user?.name || "User");

document.getElementById("pgCount").textContent =
  state.pg.score ? 1 : 0;

document.getElementById("kasusCount").textContent =
  state.kasus.selesai ? 1 : 0;

document.getElementById("avgScore").textContent =
  state.pg.score ?? "-";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".clickable").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.dataset.link;
      if (link) window.location.href = link;
    });
  });
});
let selectedMapel = "";
let selectedPaket = "";
let selectedTipe = "";

const mapelButtons = document.querySelectorAll(".mapel-btn");
const paketSelect = document.getElementById("paketSelect");
const startBtn = document.getElementById("startExam");

mapelButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    mapelButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMapel = btn.dataset.mapel;
    checkReady();
  });
});

paketSelect.addEventListener("change", e => {
  selectedPaket = e.target.value;
  checkReady();
});

document.querySelectorAll("input[name='tipe']").forEach(radio => {
  radio.addEventListener("change", e => {
    selectedTipe = e.target.value;
    checkReady();
  });
});

function checkReady() {
  startBtn.disabled = !(selectedMapel && selectedPaket && selectedTipe);
}

startBtn.addEventListener("click", () => {
  if (selectedTipe === "pg") {
    window.location.href = `/cbt-web-app/exam/pg.html`;
  } else {
    window.location.href = `/cbt-web-app/exam/case.html`;
  }
});
}
