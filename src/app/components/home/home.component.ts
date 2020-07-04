import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from '../../models/global-data';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 100,
        easing: 'out',
      },
      is3D: true
    }
  };

  loading = true;
  datatable = [];

  constructor(private dataService: DataServiceService) { }

  initChart(caseType: string) {
    this.datatable = [];
    this.globalData.forEach(cs => {
      let value: number;

      if (caseType === 'confirmed') {
        if (cs.confirmed > 2000) {
          value = cs.confirmed;
        }
      }
      if (caseType === 'active') {
        if (cs.active > 2000) {
          value = cs.active;
        }
      }
      if (caseType === 'deaths') {
        if (cs.deaths > 1000) {
          value = cs.deaths;
        }
      }
      if (caseType === 'recovered') {
        if (cs.recovered > 2000) {
          value = cs.recovered;
        }
      }

      this.datatable.push([cs.country, value]);
    });
    // console.log(this.datatable);
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            this.globalData = result;
            result.forEach(country => {
              if (!Number.isNaN(country.confirmed)) {
                this.totalActive += country.active;
                this.totalConfirmed += country.confirmed;
                this.totalDeaths += country.deaths;
                this.totalRecovered += country.active;
              }
            });
            this.initChart('confirmed');
          },
          complete: () => {
            this.loading = false;
          }
        });
  }

  updateChart(input: string) {
    console.log(input);
    this.initChart(input);
  }
}
