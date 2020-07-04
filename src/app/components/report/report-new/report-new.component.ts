import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css']
})
export class ReportNewComponent implements OnInit {
  id: number;
  editMode = false;
  reportForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private reportService: ReportService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = ( params.id );
        this.initForm();
      }
    );
  }

  onSubmit() {
    this.reportService.addRecipe(this.reportForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let reportAuthorName = '';
    let reportCreatedAt = '';
    let reportDescription = '';
    let reportImagePath = '';
    let reportSummary = '';

    this.reportForm = new FormGroup({
      'author': new FormControl(reportAuthorName, Validators.required),
      'createdAt': new FormControl(reportCreatedAt, Validators.required),
      'description': new FormControl(reportDescription, Validators.required),
      'imagePath': new FormControl(reportImagePath, Validators.required),
      'summary': new FormControl(reportSummary, Validators.required)
    });
  }
}
