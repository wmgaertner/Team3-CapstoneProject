function graph(data){

    jsonObject = JSON.parse(data);
    var jsonFirstName = jsonObject['firstname'];
    var jsonGluLength = jsonObject['glucoselevels'].length;

    var jsonGlucose = [];
    var timestamps = [];

    if (jsonObject['diabetic'] == true) {
        var topAnnotation = 180;
        var sugMax = 200;
        var topAnnotationText = "High Value (Hyperglycemia)";
        var btmAnnotationText = "Low Value (Hypoglycemia)";

    }
    else {
        var topAnnotation = 140;
        var sugMax = 160;
        var topAnnotationText = "High Value (Hypoglycemia)";
        var btmAnnotationText = "Low Value (Hypoglycemia)";
    }

    for (i = 0; i < jsonGluLength; i++) {
        jsonGlucose.push(parseFloat(jsonObject['glucoselevels'][i]));
        timestamps.push(jsonObject['timestamps'][i]);
    }
    //Display chart

    document.addEventListener('DOMContentLoaded', function() {



        var ctx = document.getElementById("myChart").getContext("2d");

        
    
        var myChart = new Chart(ctx, {

            // The type of chart we want to create
            type: "line",
            // The data for our dataset
            data: {
                labels: timestamps,
                datasets: [
                    {
                        label: "Glucose mg/dL",
                        fill: false,
                        borderColor: "rgb(255, 99, 132)",
                        data: jsonGlucose,
                    },
                ],
            },
            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: "Blood Glucose Chart"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 20,
                            suggestedMax: sugMax
                        }
                    }]
                },
                annotation: {
                    annotations: [
                        {
                            id: 'btmLine',
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: 50,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [4, 8],
                            label: {
                                backgroundColor: "red",
                                content: btmAnnotationText,
                                enabled: true
                            }
                        }, {
                            id: 'topLine',
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: topAnnotation,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [4, 8],
                            label: {
                                backgroundColor: "red",
                                content: topAnnotationText,
                                enabled: true
                            }
                        }
                    ]
                }
            },
        }); 

    });


}



function clock(){
    var today = new Date();
    var hours = today.getHours()
    var minutes = today.getMinutes();
    hours = hours % 12;
    hours = hours != 0 ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    timestamp = hours.toString() + ':' + minutes.toString() + ' ' + ampm;


    document.getElementById('txt').innerHTML +=   timestamp;
    var t = setTimeout(startTime, 500);
    
}
