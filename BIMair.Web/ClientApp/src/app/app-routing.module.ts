// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/login/forgot-password.component';
import { ResetPasswordComponent } from './components/login/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './components/projects/project-list.component';
import { ProjectComponent } from './components/projects/project.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemsComponent } from './components/orders/order-items.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { Utilities } from './services/utilities';
import { RectangularComponent } from './components/rectangular/rectangular.component';


@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'forgot', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
  { path: 'reset', component: ResetPasswordComponent, data: { title: 'Reset Password' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard], data: { title: 'Projects' } },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard], data: { title: 'Project' } },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard], data: { title: 'Project' } },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: { title: 'Customers' } },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: { title: 'Products' } },
  // { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: { title: 'Orders' } },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },
  { path: 'about', component: AboutComponent, data: { title: 'About Us' } },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'orders/:id', component: RectangularComponent, canActivate: [AuthGuard], data: { title: 'Orders' } },
  { path: 'order-items/:id', component: OrderItemsComponent, canActivate: [AuthGuard], data: { title: 'Orders' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule { }
