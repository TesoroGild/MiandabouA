import { Injectable } from '@angular/core';
import { Chart } from '../../interfaces/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  chart: Chart = {} as Chart;

  constructor() { }

  emptyChart() {
    this.chart = {} as Chart;
  }
}
