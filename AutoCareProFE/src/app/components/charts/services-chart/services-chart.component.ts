import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { ServiceRequested } from 'src/app/models/chartDtos/ServiceRequested';
import { ChartService } from 'src/app/services/charts/chart.service';


@Component({
  selector: 'app-services-chart',
  templateUrl: './services-chart.component.html',
  styleUrls: ['./services-chart.component.css']
})
export class ServicesChartComponent implements OnInit{
  
  services:ServiceRequested[]= [];
  serviceName:string[] = [];
  requestCount:number[] = [];
  dataChart:any[] = [];

  chart!:Chart;
  constructor(private chartService:ChartService){}
  ngOnInit(): void {
    this.getCounts()
    
  }

  getCounts(){
    this.chartService.getMostRequestedService().subscribe({
      next: (data:ServiceRequested[]) => {
        this.services = data;
        this.services.forEach(data => {
          this.serviceName.push(data.serviceName);
          this.requestCount.push(data.requestCount);
          this.dataChart = this.services.map(service => ({
            name: service.serviceName,
            y: service.requestCount
          }));
          console.log(this.dataChart);
          this.newChart();
        });
      },
      error: (err) => {
        console.error('Error getting services requested count:', err);
      }
    });
  }


  newChart(){
    this.chart =new Chart ({   
      chart : {
         type: 'pie',
         plotShadow: false,
         
      },
      title : {
         text: 'Servicios más solicitados'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
      
            dataLabels: {
               enabled: false           
            },
      
            showInLegend: true
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: this.dataChart
      }]
   });
  }
  
}

