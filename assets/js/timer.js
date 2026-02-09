export function startTimer(duration, key, onEnd) {
  let end = localStorage.getItem(key);
  if (!end) {
    end = Date.now() + duration * 60000;
    localStorage.setItem(key, end);
  }

  const interval = setInterval(() => {
    const sisa = Math.max(0, end - Date.now());
    if (sisa === 0) {
      clearInterval(interval);
      onEnd();
    }
    document.getElementById("timer").innerText =
      Math.ceil(sisa / 1000) + " detik";
  }, 1000);
}
