import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

import { Project } from '../../models/project';
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
  projects: Project[] = [];
  project: Project | undefined;

  rows = [];
  rowsCache = [];
  columns = [];
  editing = {};
  projectEdit: any = {};
  isDataLoaded = false;
  loadingIndicator = true;
  formResetToggle = true;
  _currentUserId: string;
  _hideCompletedTasks = false;

  constructor(private projectService: ProjectService,
    private alertService: AlertService, private translationService: AppTranslationService, private localStorage: LocalStoreManager) { }

  ngOnInit(): void {
    this.getProjects();

    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'completed', name: '', width: 30, headerTemplate: this.statusHeaderTemplate, cellTemplate: this.statusTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false },
      { prop: 'name', name: gT('todoDemo.management.Task'), cellTemplate: this.nameTemplate, width: 200 },
      { prop: 'description', name: gT('todoDemo.management.Description'), cellTemplate: this.descriptionTemplate, width: 500 },
      { name: '', width: 80, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
    ];

  }

  private getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.rows = projects;
        this.rowsCache = [...projects];
        this.isDataLoaded = true;

        setTimeout(() => { this.loadingIndicator = false; }, 1500);

        this.projects = projects
      });
  }


  refreshDataIndexes(data) {
    let index = 0;

    for (const i of data) {
      i.$$index = index++;
    }
  }


  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r =>
      Utilities.searchArray(value, false, r.name, r.description));
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }


  addTask() {
    this.formResetToggle = true;
  }

  save() {
    this.rowsCache.splice(0, 0, this.projectEdit);
    this.rows.splice(0, 0, this.projectEdit);
    this.refreshDataIndexes(this.rowsCache);
    this.rows = [...this.rows];
  }


  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
    this.rows = [...this.rows];

    //this.saveToDisk();
  }


  delete(row) {
    this.alertService.showDialog('Are you sure you want to delete the task?', DialogType.confirm, () => this.deleteHelper(row));
  }

  deleteHelper(row) {
    this.rowsCache = this.rowsCache.filter(item => item !== row);
    this.rows = this.rows.filter(item => item !== row);

    // this.saveToDisk();
  }

  /* TBD */
  @Input()
  verticalScrollbar = false;


  @ViewChild('statusHeaderTemplate', { static: true })
  statusHeaderTemplate: TemplateRef<any>;

  @ViewChild('statusTemplate', { static: true })
  statusTemplate: TemplateRef<any>;

  @ViewChild('nameTemplate', { static: true })
  nameTemplate: TemplateRef<any>;

  @ViewChild('descriptionTemplate', { static: true })
  descriptionTemplate: TemplateRef<any>;

  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  set hideCompletedTasks(value: boolean) {

    if (value) {
      this.rows = this.projects.filter(r => !r.name);
    } else {
      this.rows = [...this.rowsCache];
    }


    this._hideCompletedTasks = value;
  }

  get hideCompletedTasks() {
    return this._hideCompletedTasks;
  }

}
