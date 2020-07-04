import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Report } from './report.model';
import { ReportService } from './report.service';

@Injectable({ providedIn: 'root' })
export class ReportResolverService implements Resolve<Report[]> {
  constructor(private reportService: ReportService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const reports: Report[] = this.reportService.getReports();
    if (reports.length === 0)
      return this.reportService.fetchReports();
    else
      return reports;
  }
}
