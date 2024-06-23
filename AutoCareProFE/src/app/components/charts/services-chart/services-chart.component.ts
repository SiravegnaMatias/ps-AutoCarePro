import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-services-chart',
  templateUrl: './services-chart.component.html',
  styleUrls: ['./services-chart.component.css']
})
export class ServicesChartComponent {

  chart!: Chart;

  refreshChart() {
    this.chart = new Chart({
      chart: {
        plotShadow: false,
        type: 'pie' // Set chart type here
      },
      title: {
        text: 'Browser market shares in March, 2022',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 74.77,
          sliced: true,
          selected: true
        }, {
          name: 'Edge',
          y: 12.82
        }, {
          name: 'Firefox',
          y: 4.63
        }, {
          name: 'Safari',
          y: 2.44
        }, {
          name: 'Internet Explorer',
          y: 2.02
        }, {
          name: 'Other',
          y: 3.28
        } ]
      }]
    });
  }
}

