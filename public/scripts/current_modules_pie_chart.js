async function drawPieChart(backlog, progress, finish){
	var ctx = document.getElementById("current_modules_pie_chart").getContext("2d");
var backlogs = backlog;
var inProgress = progress;
var finished = finish;

var tempData = [backlogs, inProgress, finished];

var myChart = new Chart(ctx, {
  type: "polarArea",
  data: {
    labels: ["Backlogs", "In-Progress", "Finished"],
    datasets: [
      {
        label: "Modules",
        data: tempData,
        backgroundColor: ["red", "blue", "green"],
        borderColor: ["white", "white", "white"],
        labels: ["Backlogs", "In-Progress", "Finished"],
        borderWidth: 3,
        borderAlign: "center",
        hoverBorderColor:'white',
        hoverBorderWidth: 10
      }
    ]
  },
  options: {
    responsive:true,
    animation: { animateRotate: true, animateScale:true },
    legend: {
      position: "bottom"
    },
    title: {
      fontColor: "blue",
      display: true,
      text: "CURRENT MODULES"
    },
    scale:{
        display:false
    },
    /*scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: false
          }
        }
      ]
    }*/
  }
});

}
