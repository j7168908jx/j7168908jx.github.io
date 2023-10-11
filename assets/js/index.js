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
                    text: "Languages over Last 30 Days (Powered by wakatime.com)",
                    fullSize: true,
                    font: {
                        size: 16
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
    fetch('https://wakatime.com/share/@j7168908jx/1622d795-cb96-4dd2-91b3-c7ffd4464ea8.json')
        .then(response => response.json())
        .then(data => {monthRecordData = data; drawGraph(data);})
        .catch(error => console.error('Error:', error));
};

window.addEventListener('DOMContentLoaded', includeCodingLanguageMonthRecord);

