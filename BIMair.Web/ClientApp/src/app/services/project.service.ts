import { Injectable } from '@angular/core';
import { ProjectEndpoint } from './project-endpoint.service';
import { Project } from '../models/project';
import { Observable } from "rxjs";

@Injectable()
export class ProjectService {

  constructor(
    private projectEndpoint: ProjectEndpoint) {

  }

  getProjects() {
    return this.projectEndpoint.getProjectsEndpoint<Project[]>(1,10);
  }

  getProjectsByCustomer(customerId?: number) {
    return this.projectEndpoint.getProjectsByCustomerEndpoint<Project>(customerId);
  }


  getProjectsByUser(userId?: string) {
    return this.projectEndpoint.getProjectsByUserEndpoint<Project>(userId);
  }

  addProject(project: Project) {
    return this.projectEndpoint.addProjectEndpoint<Project>(project);
  }

  updateProject(project: Project) {
    return this.projectEndpoint.updateProjectEndpoint<Project>(project);
  }

  deleteProject(projectId: number) {
    return this.projectEndpoint.deleteProjectEndpoint<Project>(projectId);
  }

}
