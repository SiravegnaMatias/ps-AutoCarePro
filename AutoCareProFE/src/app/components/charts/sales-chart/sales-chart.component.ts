import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ProductXSale } from 'src/app/models/chartDtos/ProductXsale';
import { ChartService } from 'src/app/services/charts/chart.service';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit{
  chart!:Chart;
  productsSales:ProductXSale[]= [];
  productsName:string[] = [];
  productsCount:number[] = [];


  constructor(private chartService:ChartService){}


  ngOnInit(): void {
     this.chartService.getproductsSalesCount().subscribe({
      next: (data:ProductXSale[]) => {
        this.productsSales = data;

        this.productsSales.forEach(data => {
          this.productsName.push(data.productName);
          this.productsCount.push(data.salesQuantity);
        });
        this.refreshChart();
      },
      error: (err) => {
        console.error('Error getting products sales count:', err);
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
        categories: this.productsName
      
      },
      series: [
        {
          name: 'Clientes',
          data: this.productsCount,
          type: 'column'
        }
      ]
    });
  }

}
