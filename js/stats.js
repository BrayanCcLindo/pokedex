const ctx = document.getElementById("stats").getContext("2d");

export function createChart(stats, name) {
  return new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "HP",
        "Attack",
        "Defense",
        "Special Attack",
        "Special Defense",
        "Speed",
      ],
      datasets: [
        {
          data: stats,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: name,
          padding: {
            top: 10,
          },
          color: "#fff",
        },
      },
      scales: {
        r: {
          grid: {
            color: "#f2f2f2",
          },
          pointLabels: {
            color: "white",
            fontSize: "5px",
          },
          angleLines: {
            color: "#f2f2f2",
          },
        },
      },
    },
  });
}
