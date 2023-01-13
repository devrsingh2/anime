import { Component } from '@angular/core';
import { AnimeApiService } from './services/anime-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aanim Ranking';

  gridColumns = 5;

  animeData: any = null;
  chartLevel: any = [];
  chartValue: any = [];
  constructor(private api: AnimeApiService) { }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 5 ? 4 : 5;
  }

  ngOnInit() {
    this.api.getTopAnime().subscribe((data: any) => {
      const response = data;
      // console.log('data', response)
      this.animeData = data;

      const arrLevel: any = [];
      const arrValue: any = [];
      data.data.filter((itm: any) => itm.year !== null)
        .sort((a: any, b: any) => a?.year - b?.year)
        .map((item: any, idx: number) => {
          // arrLevel[idx] = 
          arrLevel.push(item.year);
          arrValue.push(item.title);
        });
      // console.log('arrLevel', arrLevel);
      // console.log('arrValue', arrValue);
      this.chartLevel = arrLevel;
      this.chartValue = arrValue;
    });
  }

}
