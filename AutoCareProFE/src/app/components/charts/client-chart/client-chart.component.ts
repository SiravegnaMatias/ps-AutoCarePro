import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UserXVehicle } from 'src/app/models/chartDtos/UserXVehicle';
import { ChartService } from 'src/app/services/charts/chart.service';
@Component({
  selector: 'app-client-chart',
  templateUrl: './client-chart.component.html',
  styleUrls: ['./client-chart.component.css']
})
export class ClientChartComponent implements OnInit{
  ngOnInit(): void {
    this.getCount();
    
   
  }
  chart!:Chart;
  clientsVehicles:UserXVehicle[]= [];
  vehiclesCount:number[] = [];
  clients:string[]=[];

  constructor(private chartService:ChartService){}

  getCount(){
    this.chartService.getUserVehicles().subscribe({
      next: (data:UserXVehicle[]) => {
        this.clientsVehicles = data;
        this.clientsVehicles.forEach(data => {
          this.clients.push(data.name);
          this.vehiclesCount.push(data.vehiclesCount);
        });
        this.refreshChart();

      },
      error: (err) => {
        console.error('Error getting user vehicles:', err);
      }
    });

   

  }
  refreshChart(){
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Clientes por vehículo'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.clients
      
      },
      series: [
        {
          name: 'Clientes',
          data: this.vehiclesCount,
          type: 'column'
        }
      ]
    });
  }

 
}
