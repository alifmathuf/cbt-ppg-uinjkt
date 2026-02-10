export function scoreChart(ctx, data) {
  return new Chart(ctx, {
    type: "doughnut", // lebih cocok utk result
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: [
          "#22d3ee", // tosca
          "#fb7185"  // soft red
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,

      /* 🔑 KUNCI UTAMA BIAR TIDAK GEDE */
      maintainAspectRatio: false,

      cutout: "65%", // lubang tengah (proporsional)

      layout: {
        padding: 12
      },

      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 14,
            boxHeight: 14,
            padding: 10,
            font: {
              size: 12,
              weight: "500"
            },
            color: "#e5e7eb"
          }
        },
        tooltip: {
          bodyFont: {
            size: 13
          }
        }
      }
    }
  });
}
