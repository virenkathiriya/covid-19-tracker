import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateWiseData } from '../../models/date-wise-data';
import { GlobalDataSummary } from '../../models/global-data';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  selectedCountryData: DateWiseData[];

  data: GlobalDataSummary[];
  dataTable;
  countries: string[] = [];

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  };

  loading = true;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(map(result => {
        this.data = result;
        this.data.forEach(cs => {
          this.countries.push(cs.country);
        });
      }))
    ).subscribe(
      {
        complete: () => {
          this.updateValues('US');
          this.updateChart();
          this.loading = false;
        }
      }
    );
  }

  updateChart() {
    this.dataTable = [];
    this.selectedCountryData.forEach(cs => {
      this.dataTable.push([cs.date, cs.cases]);
    });
  }

  updateValues(countryName: string) {
    console.log(countryName);
    this.data.forEach(country => {
      if (country.country === countryName) {
        this.totalActive = country.active;
        this.totalDeaths = country.deaths;
        this.totalConfirmed = country.confirmed;
        this.totalRecovered = country.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[countryName];
    this.updateChart();
  }
}
