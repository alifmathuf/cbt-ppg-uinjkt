export function scoreChart(ctx, data) {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: ["#22d3ee", "#fb7185"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#e5e7eb",
            font: { size: 12 }
          }
        }
      }
    }
  });
}
