export function scoreChart(ctx, data) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        tension: .3
      }]
    },
    options: {
      plugins: { legend: false },
      responsive: true
    }
  });
}
