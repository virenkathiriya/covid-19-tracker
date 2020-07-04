import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { ReportService } from '../components/report/report.service';
import { DateWiseData } from '../models/date-wise-data';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // tslint:disable-next-line:max-line-length
  private globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  private dateWiseDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  constructor(private http: HttpClient, private reportService: ReportService) {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    console.log(now.getDate());
    this.globalDataURL = `${ this.globalDataURL }${ ( now.getMonth() + 1 < 10 ) ? '0' + ( now.getMonth() + 1 ) : ( now.getMonth() + 1 ) }-${ ( now.getDate() < 10 ) ? '0' + now.getDate() : now.getDate() }-${ now.getFullYear() }.csv`;
  }

  getDateWiseData() {
    return this.http.get(this.dateWiseDataURL, { responseType: 'text' })
      .pipe(map(result => {
        const rows = result.split('\n');
        const mainData = {};
        const header = rows[0];
        const dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);

        rows.forEach(row => {
          const column = row.split(/,(?=\S)/);
          const country = column[1];
          column.splice(0, 4);
          mainData[country] = [];
          column.forEach((value, index) => {
            const dateWise: DateWiseData = {
              cases: +value,
              country,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[country].push(dateWise);
          });
        });
        return mainData;
      }));
  }

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
