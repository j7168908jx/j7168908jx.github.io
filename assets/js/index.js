var chart;
var drawGraph = function (data1) {
    var data = data1.data.filter(d => d.percent >= 1).filter(d => d.name !== "Other");
    // add another one named rest to the end
    var rest = {
        name: "Other languages",
        percent: 100 - data.reduce((a, b) => a + b.percent, 0),
        color: "#ccc",
    };
    data.push(rest);
    var totalTime = data[0].total_seconds / data[0].percent * 100.0;
    var totalHoursString = Math.floor(totalTime / 3600).toString() + " hrs";
    var totalMinutesString = Math.floor((totalTime % 3600) / 60).toString() + " mins";
    const ctx = document.getElementById('coding-language-month-chart');
    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: data.map(d => d.name + " (" + d.percent.toFixed(1) + "%)"),
            datasets: [{
                backgroundColor: data.map(d => d.color),
                data: data.map(d => d.percent)
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: ["Total " + totalHoursString + " " + totalMinutesString + " in the last 30 days"],
                    fullSize: true,
                    font: {
                        size: 18
                    }
                },
                legend: {
                    position: "left"
                }
            }
        },
    });
}

var monthRecordData;
var includeCodingLanguageMonthRecord = function () {
    fetch('https://wakatime.com/share/@j7168908jx/761ac407-b95e-4be2-b6a9-9ca4c8123d09.json')
        .then(response => response.json())
        .then(data => {monthRecordData = data; drawGraph(data);})
        .catch(error => console.error('Error:', error));
};

window.addEventListener('DOMContentLoaded', includeCodingLanguageMonthRecord);

