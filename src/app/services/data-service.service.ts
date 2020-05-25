import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-23-2020.csv';

  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataURL, { responseType: 'text' }).pipe(
      map(result => {
        const data: GlobalDataSummary[] = [];
        const raw = {};
        const rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);
          const currentColumn = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          const currentUtil: GlobalDataSummary = raw[currentColumn.country];
          if (currentUtil) {
            currentUtil.active = currentColumn.active + currentUtil.active;
            currentUtil.confirmed = currentColumn.confirmed + currentUtil.confirmed;
            currentUtil.deaths = currentColumn.deaths + currentUtil.deaths;
            currentUtil.recovered = currentColumn.recovered + currentUtil.recovered;
            raw[currentColumn.country] = currentUtil;
          } else {
            raw[currentColumn.country] = currentColumn;
          }
        });
        return Object.values(raw) as GlobalDataSummary[];
      })
    );
  }
}
