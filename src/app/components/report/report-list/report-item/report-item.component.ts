import { Component, Input, OnInit } from '@angular/core';
import { Report } from '../../report.model';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {

  @Input() report: Report;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
