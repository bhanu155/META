var ctx = document.getElementById("recent_project_line_graph").getContext("2d");
var efficiency = [50, 35, 60, 65, 80, 99]; // efficiency performance in recent projects
var deadlinesCrossed = [4, 6, 3, 2, 1, 0]; // number of times deadlines crossed in recent projects
var projectNames = ["alpha", "Beta", "Gamma", "Delta", "Theta", "pi"];

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: projectNames,
    datasets: [
      {
        label: "Performance index", // out of 100
        data: efficiency,
        backgroundColor: "transparent",
        borderColor: "green",
        borderWidth: 2,
        pointRadius: 4
      },
      {
        label: "deadlines crossed",
        data: deadlinesCrossed,
        backgroundColor: "transparent",
        borderColor: "red",
        borderWidth: 1,
        pointRadius: 3
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: true,
    title: {
      fontColor: "blue",
      display: true,
      text: "RECENT PROJECTS"
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true
            // color:'blue'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            suggestedMax: 100,
            min: 0,
            stepSize: 10,
            beginAtZero: true
          }
        }
      ]
    }
  }
});
