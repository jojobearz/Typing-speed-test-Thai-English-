function LoadFingerSpeed(pChartXAxis, pLeftHandValue, pRightHandValue) {

    var options = {
        chart: {
            renderTo: 'containerHighChart',
            polar: true,
            type: 'line'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Fingers Speed',
            align: 'center'
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: pChartXAxis,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
            name: 'Left Hand (Milliseconds)',
            data: pLeftHandValue,
            pointPlacement: 'on'
        }, {
			name: 'Right Hand (Milliseconds)',
            data: pRightHandValue,
            pointPlacement: 'on'
		}]
    };
    var chart = new Highcharts.Chart(options);
}

