import { Component, OnInit } from '@angular/core';
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
  data: GlobalDataSummary[];
  countries: string[] = [];
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(country => {
        this.countries.push(country.country);
      });
    });
  }

  updateValues(countryName: string){
    console.log(countryName);
    this.data.forEach( country => {
      if(country.country === countryName){
        this.totalActive = country.active;
        this.totalDeaths = country.deaths;
        this.totalConfirmed = country.confirmed;
        this.totalRecovered = country.recovered;
      }
    });
  }
}
