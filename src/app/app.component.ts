import { Component, OnInit } from '@angular/core';

import { AuthService } from './components/auth/auth.service';
import { ReportService } from './components/report/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private reportService: ReportService) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.reportService.fetchReports().subscribe();
  }
}
