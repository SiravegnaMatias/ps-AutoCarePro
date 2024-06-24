import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ProductXSale } from 'src/app/models/chartDtos/ProductXsale';
import { ChartService } from 'src/app/services/charts/chart.service';
import flatpickr from 'flatpickr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  dateRangeForm!:FormGroup;


  constructor(private chartService:ChartService, private fb:FormBuilder){}


  ngOnInit(): void {
    this.initForm();


     this.getAllProducts()
  }

  initForm(){
    this.dateRangeForm = this.fb.group({
      dateRange: ['',Validators.required]
    });
  }
  ngAfterViewInit() {
    flatpickr('#datepicker', {
      mode: 'range',
      dateFormat: 'Y-m-d',
    });
  }

  refreshChart(){
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Productos mas vendidos'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.productsName
      
      },
      series: [
        {
          name: 'Productos',
          data: this.productsCount,
          type: 'column'
        }
      ]
    });
  }

  getByDates(){
    if(this.dateRangeForm.valid){
      const dates = this.dateRangeForm.get('dateRange')?.value;
      const [from, to] = dates.split(' to ');
      this.chartService.getMostSoldProdcutsBySales(from, to).subscribe({
        next: (data:ProductXSale[]) => {
          this.productsSales = data;
          this.productsName = [];
          this.productsCount = [];
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
    }else{
      this.dateRangeForm.markAllAsTouched();
    }
   }
    

  getAllProducts(){
    this.chartService.getproductsSalesCount().subscribe({
      next: (data:ProductXSale[]) => {
        this.productsSales = data;
        this.productsName = [];
        this.productsCount = [];
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

  deleteFilters(){
    this.dateRangeForm.reset();
    this.getAllProducts();
  }
}
