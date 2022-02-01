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
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ProjectEndpoint extends EndpointBase {
  get customersByUserUrl() { return this.configurations.baseUrl + '/api/customer/byuser'; } // get customers by user
  get projectsUrl() { return this.configurations.baseUrl + '/api/projects'; }
  get projectUrl() { return this.configurations.baseUrl + '/api/projects'; }
  get projectsByCustomerUrl() { return this.configurations.baseUrl + '/api/projects/customer'; }
  get projectsByUserUrl() { return this.configurations.baseUrl + '/api/projects/user'; }
  get saveProjectUrl() { return this.configurations.baseUrl + '/api/projects/save'; }
  get deteProjectUrl() { return this.configurations.baseUrl + '/api/projects'; }
  get saveOrderUrl() { return this.configurations.baseUrl + '/api/projects/saveorder'; }
  get orderItemsByProjectUrl() { return this.configurations.baseUrl + '/api/projects/projectitems'; }
  // get saveOrderItemsUrl() { return this.configurations.baseUrl + '/api/projects/saveorder'; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getProjectsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = `${this.projectsUrl}/${page}/${pageSize}`;
    return this.http.get<T>(this.projectsUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectsEndpoint(page, pageSize));
      }));
  }

  getProjectEndpoint<T>(Id?: number): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${Id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getProjectEndpoint(Id));
      }));
  }

  getCustomersByUserEndpoint<T>(): Observable<T> {
    const endpointUrl = this.customersByUserUrl;
    return this.http.get<T>(this.customersByUserUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCustomersByUserEndpoint());
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

    let dd = new Date(projectObject.deliveryDate['year'], projectObject.deliveryDate['month'] - 1, projectObject.deliveryDate['day'] + 1)
    projectObject.deliveryDate = dd;
    return this.http.post<T>(this.saveProjectUrl, JSON.stringify(projectObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.saveProjectEndpoint(projectObject));
      }));
  }

  deleteProjectEndpoint<T>(projectId?: number): Observable<T> {
    const endpointUrl = `${this.projectUrl}/${projectId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.deleteProjectEndpoint(projectId));
      }));
  }

  saveOrderEndpoint<T>(orderItems: any, confirmOrder: number): Observable<T> {
    const endpointUrl = `${this.saveOrderUrl}/${confirmOrder}`;
    console.log(confirmOrder);
    var items = this.returnNonEmpty(orderItems);

    return this.http.post<T>(endpointUrl, items, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.saveOrderEndpoint(orderItems, confirmOrder));
      }));
  }

  getOrderItemsByProjectId<T>(projectId?: number): Observable<T> {
    const endpointUrl = `${this.orderItemsByProjectUrl}/${projectId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getOrderItemsByProjectId(projectId));
      }));
  }

  // saveOrderItemsEndpoint<T>(orderItems: any, confirmOrder: boolean): Observable<T> {
  //   var items = this.returnNonEmpty(orderItems);
  //   var _url = `${this.saveOrderItemsUrl}/${confirmOrder}`;
  //   return this.http.post<T>(_url, items, this.requestHeaders).pipe<T>(
  //     catchError(error => {
  //       return this.handleError(error, () => this.saveOrderItemsEndpoint(items, confirmOrder));
  //     }));
  // }

  returnNonEmpty(array: []) {
    return array.map((obj: any) => {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] == "") {
          delete obj[propName];
        }
      }
      return obj
    })
  }

}
