import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Report } from './report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  reportsChanged = new Subject<Report[]>();
  private reports: Report[] = [];

  constructor(private http: HttpClient) {}

  setReport(reports: Report[]) {
    if (reports !== null) {
      this.reports = reports;
    }
    this.reportsChanged.next(this.reports.slice());
    console.log(this.reports);
  }

  getReports() {
    return this.reports.slice();
  }

  getReport(index: number) {
    return this.reports[index];
  }

  addRecipe(report: Report) {
    if (this.reports === null) {
      this.reports = [];
    }
    this.reports.push(report);
    this.reportsChanged.next(this.reports.slice());
    this.storeReport();
  }

  storeReport() {
    this.http.put('https://covidtracker-86181.firebaseio.com/reports.json', this.reports).subscribe(
      res => {
        console.log(res);
      });
  }

  fetchReports() {
    console.log('fetching reports ds');
    return this.http.get<Report[]>('https://covidtracker-86181.firebaseio.com/reports.json')
      .pipe(map(recipes => {
        this.setReport(recipes);
        return recipes;
      }));
  }
}
