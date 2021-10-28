import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

import { AppTranslationService } from '../../services/app-translation.service';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  project: Project | undefined;
  public isSaving = false;
  submitted = false;
  savedSuccessfully = false;
  public showValidationErrors = true;

  constructor(private projectService: ProjectService,
    private alertService: AlertService, private translationService: AppTranslationService, private localStorage: LocalStoreManager) { }

  ngOnInit(): void {
    // this.project = new Project();
  }

  addProject() {
    this.isSaving = true;
    this.submitted = true;
    this.alertService.startLoadingMessage('Saving changes...');
    this.projectService.addProject(this.project).subscribe(user => this.saveSuccessHelper(this.project), error => this.saveFailedHelper(error));

    this.projectService.addProject(this.project)
      .subscribe(projects => {

      });
  }

  private saveSuccessHelper(project?: Project) {

    this.isSaving = false;
    this.savedSuccessfully = true;
    this.alertService.stopLoadingMessage();
    this.showValidationErrors = false;

    this.alertService.showMessage('Success', `Project \"${this.project.name}\" created successfully`, MessageSeverity.success);

    //if (this.changesSavedCallback) {
    //  this.changesSavedCallback();
    //}
  }


  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);

    //if (this.changesFailedCallback) {
    //  this.changesFailedCallback();
    //}
  }

}
