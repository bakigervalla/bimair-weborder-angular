import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  rows = new Array<Project>();
  totalCount: Number = 0;
  closeResult: string;
  dataParams: any = {
    page_num: '',
    page_size: ''
  };

  @ViewChild('projectsTable') table;

  private isLoading: boolean = false;
  loadingIndicator = true;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.isLoading = true;
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 20;

    setTimeout(() => { this.loadingIndicator = false; }, 1500);

    this.getProjects();
  }

  private getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.rows = projects;
        // this.totalCount = projects.length
        // this.rowsCache = [...projects];
        this.isLoading = false;
      });
  }
}
