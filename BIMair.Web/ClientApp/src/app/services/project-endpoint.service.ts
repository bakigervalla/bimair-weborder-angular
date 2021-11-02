// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ProjectEndpoint extends EndpointBase {
  get customersByUserUrl() { return this.configurations.baseUrl + '/api/customer/byuser'; } // get customers by user
  get projectsUrl() { return this.configurations.baseUrl + '/api/projects'; }
  get projectUrl() { return this.configurations.baseUrl + '/api/projects/id'; }
  get projectsByCustomerUrl() { return this.configurations.baseUrl + '/api/projects/customer'; }
  get projectsByUserUrl() { return this.configurations.baseUrl + '/api/projects/user'; }
  get addProjectUrl() { return this.configurations.baseUrl + '/api/projects/add'; }
  get updateProjectUrl() { return this.configurations.baseUrl + '/api/projects'; }
  get deteProjectUrl() { return this.configurations.baseUrl + '/api/projects'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getProjectsEndpoint<T>(page?:number, pageSize?:number): Observable<T> {
    const endpointUrl = `${this.projectsUrl}/${page}/${pageSize}`;
    return this.http.get<T>(this.projectsUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectsEndpoint(page, pageSize));
      }));
  }

  getCustomersByUserEndpoint<T>(): Observable<T> {
    const endpointUrl = this.customersByUserUrl;
    return this.http.get<T>(this.customersByUserUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCustomersByUserEndpoint());
      }));
  }

  getProjectEndpoint<T>(Id?: number): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${Id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectEndpoint(Id));
      }));
  }

  getProjectsByCustomerEndpoint<T>(customerId?: number): Observable<T> {
    const endpointUrl = `${this.projectsByCustomerUrl}/${customerId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectsByCustomerEndpoint(customerId));
      }));
  }

  getProjectsByUserEndpoint<T>(userId?: string): Observable<T> {
    const endpointUrl = `${this.projectsByUserUrl}/${userId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectsByUserEndpoint(userId));
      }));
  }

  saveProjectEndpoint<T>(projectObject: any): Observable<T> {
    console.log(projectObject);
    console.log(JSON.stringify(projectObject));
    return this.http.post<T>(this.addProjectUrl, JSON.stringify(projectObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.saveProjectEndpoint(projectObject));
      }));
  }

  deleteProjectEndpoint<T>(projectId?: number): Observable<T> {

    return this.http.post<T>(this.projectUrl, JSON.stringify(projectId), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.deleteProjectEndpoint(projectId));
      }));
  }

}