import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { AppTranslationService } from '../../services/app-translation.service';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { Utilities } from '../../services/utilities';

import { Project } from '../../models/project.model';
import { ProjectEdit, ProjectStatus } from '../../models/project-edit.model';
import { Customer } from '../../models/customer.model';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  projectForm: FormGroup | undefined;
  isSaving = false;
  isDeleting = false
  submitted = false;
  savedSuccessfully = false;
  showValidationErrors = true;
  isStatusEditable = true;
  uniqueId: string = Utilities.uniqueId();
  project: Project = new Project();
  projectEdit: ProjectEdit = new ProjectEdit();
  customers: string[];

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  @ViewChild('f')
  public form;

  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('customerName')
  public customerName;

  @ViewChild('id')
  public id;

  @ViewChild('name')
  public name;

  @ViewChild('number')
  public number;

  @ViewChild('reference')
  public reference;

  @ViewChild('deliveryAddress')
  public deliveryAddress;

  @ViewChild('deliveryDate')
  public deliveryDate; //: NgbDatepicker

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService, private projectService: ProjectService) { }

  ngOnInit() {
    this.getCustomers();
    let id = +this.route.snapshot.params['id'];
    if (id > 0)
      this.getProject(id);
  }
  // convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  getCustomers() {
    this.projectService.getCustomersByUser()
      .subscribe(data => this.customers = data.map(x => x.name));
  }

  getProject(id: number) {
    this.projectService.getProject(id)
      .subscribe(data => {
        this.projectEdit = data;
        console.log(data?.status)
        this.isStatusEditable = data?.status < 3; // Order Confirmed
        // var ddFormated = new Date(this.projectEdit.deliveryDate.toString());
        // this.projectEdit.deliveryDate = { year: ddFormated.getFullYear(), month: ddFormated.getMonth() +1, day: ddFormated.getDate() }; // July, 14 1789;
      });
  }

  save() {

    if (this.projectForm && this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.submitted = true;

    this.alertService.startLoadingMessage('Saving project...');
    this.projectService.saveProject(this.projectEdit).subscribe(project => this.saveSuccessHelper(project), error => this.saveFailedHelper(error));
  }

  private saveSuccessHelper(project?: Project) {

    if (project) {
      Object.assign(this.projectEdit, project);
    }

    this.isSaving = false;
    this.savedSuccessfully = true;
    this.alertService.stopLoadingMessage();
    this.showValidationErrors = false;

    this.alertService.showMessage('Success', `Project \"${this.projectEdit.name}\" saved successfully`, MessageSeverity.success);

    this.router.navigateByUrl('/projects');
  }

  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occurred whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);

    if (this.changesFailedCallback) {
      this.changesFailedCallback();
    }
  }

  delete() {
    if (!confirm("Are you sure to delete this project"))
      return;

    this.isDeleting = true;
    console.log(this.projectEdit.id);
    this.alertService.startLoadingMessage('Deleting project...');
    this.projectService.deleteProject(this.projectEdit.id).subscribe(p => this.deleteSuccessHelper(), error => this.deleteFailedHelper(error));
  }

  private deleteSuccessHelper() {
    this.isDeleting = false;
    this.alertService.stopLoadingMessage();
    this.showValidationErrors = false;

    this.alertService.showMessage('Success', `Project \"${this.projectEdit.name}\" deleted successfully`, MessageSeverity.success);

    this.router.navigateByUrl('/projects');
  }

  private deleteFailedHelper(error: any) {
    this.isDeleting = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Delete Error', 'The below errors occurred while deleting project:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.customers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  public projectStatus(status: number) {
    switch(status) {
      case 1:
        return "projects.projectStatusPending";
      case 3:
        return "projects.projectStatusConfirmed";
      case 6:
        return "projects.projectStatusProcessing";
      case 9:
        return "projects.projectStatusShipping";
      case 12:
        return "projects.StatusComplete";
    }
  }

}
