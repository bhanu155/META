function drawDoughnutChart(backlog, progress, finish, projectName){
	var ctxD = document.getElementById("project_card_doughnut_chart_"+projectName).getContext("2d");
var backlogs = backlog;
var inProgress = progress;
var finished = finish;

var tempData = [finished, inProgress, backlogs];


var myLineChart = new Chart(ctxD, {
      type: "doughnut",
      data: {
            labels: ["Finished", "In-Progress", "Backlog"],
            datasets: [
                  {
                        data: tempData,
                        backgroundColor: ["green", "blue", "gray"],
                        borderColor: ["white", "white", "white"],
                        hoverBackgroundColor: ["green", "blue", "gray"]
                  }
            ]
      },
      options: {
            legend: {
                  display: false
            },
           //responsive: true
      }
});
}

	


