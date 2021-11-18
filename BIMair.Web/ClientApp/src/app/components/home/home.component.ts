// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================
import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Utilities } from '../../services/utilities';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut]
})
export class HomeComponent {
  rows = new Array<Project>();
  rowsCache = [];
  constructor(public configurations: ConfigurationService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();


  }

  private getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
        console.log(projects);
        this.rows = projects;
        this.rowsCache = [...projects];
        // this.totalCount = projects.length
        // this.rowsCache = [...projects];
        // this.isLoading = false;
      });
      console.log(this.rows);
  }

}
