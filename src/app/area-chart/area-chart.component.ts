import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { AnimeApiService } from '../services/anime-api.service';
import { colors } from './../colors';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {

  constructor(private api: AnimeApiService) { }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @ViewChild('myCanvas') canvas: ElementRef;

  public chartLabels: Label[] = ['El1', 'El2', 'El3', 'El4'];
  public chartData: ChartDataSets[] = [{
    data: [26, 21, 35, 42], label: 'Data 1',
    fill: true
  }];

  ngOnInit() {
    this.api.getTopAnime().subscribe((data: any) => {
      const response = data;
      const arrLevel: any = [];
      const arrValue: any = [];
      // data.data.filter((itm: any) => itm.year !== null)
      //   .sort((a: any, b: any) => a?.year - b?.year)
      //   .map((item: any, idx: number) => {
      //     // arrLevel[idx] = 
      //     arrLevel.push(item.year);
      //     arrValue.push(item.title);
      //   });

      // var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
      const result = data.data.reduce(function (r: any, a: any) {
        r[a.year] = r[a.year] || [];
        // r[a.year].push(a);
        if (a !== null) {
          // const dataVal = {
          //   name: a.title,
          //   year: a.year
          // };
          const dataVal = a.title;
          r[a.year].push(dataVal);
          // r[a.year].push(a);
        }
        return r;
      }, Object.create(null));

      var keys = Object.keys(result).filter(Number);
      // var values = Object.values(result);
      var values = Object.values(result)
        .map((itm: any) => {
          // console.log('itm', itm)
          // array.toString()
          // return {...itm.toString()};
          return itm.length;
        });

      this.chartLabels = keys;
      this.chartData = [{
        data: values,
        label: 'Anime',
        fill: true
      }];
      // this.chartLevel = arrLevel;
      // this.chartValue = arrValue;
    });
  }

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public chartColors: Color[] = [{
    pointRadius: 7
  }];

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(100, 0, 500, 0);
    gradientStroke.addColorStop(0, colors.darkColor);
    gradientStroke.addColorStop(0.3, colors.lightColor);
    gradientStroke.addColorStop(0.6, colors.chartColor1);
    gradientStroke.addColorStop(1, colors.chartColor2);

    const gradientFill = ctx.createLinearGradient(100, 0, 500, 0);
    gradientFill.addColorStop(0, "rgba(100, 201, 207, 0.6)");
    gradientFill.addColorStop(0.3, "rgba(253, 228, 156, 0.6)");
    gradientFill.addColorStop(0.6, "rgba(255, 183, 64, 0.6)");
    gradientFill.addColorStop(1, "rgba(223, 113, 27, 0.6)");

    this.chartColors = [{
      borderColor: gradientStroke,
      pointBackgroundColor: gradientStroke,
      backgroundColor: gradientFill
    }];
  }

}