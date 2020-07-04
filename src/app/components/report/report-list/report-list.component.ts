import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from '../report.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit, OnDestroy {
  reports: Report[];
  subscription: Subscription;

  constructor(private reportService: ReportService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.reportService.reportsChanged.subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.reports = this.reportService.getReports();
    console.log(this.reports);
  }

  onNewReport() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
