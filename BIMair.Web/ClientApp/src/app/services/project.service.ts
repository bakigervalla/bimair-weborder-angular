import { Injectable } from '@angular/core';
import { ProjectEndpoint } from './project-endpoint.service';
import { Project } from '../models/project.model';
import { ProjectEdit } from '../models/project-edit.model';
import { Customer } from '../models/customer.model';
import { Observable } from "rxjs";

@Injectable()
export class ProjectService {

  constructor(
    private projectEndpoint: ProjectEndpoint) {

  }

  getCustomersByUser() {
    return this.projectEndpoint.getCustomersByUserEndpoint<Customer[]>();
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

  saveProject(project: ProjectEdit) {
    return this.projectEndpoint.saveProjectEndpoint<Project>(project);
  }

  deleteProject(projectId: number) {
    return this.projectEndpoint.deleteProjectEndpoint<Project>(projectId);
  }

}
