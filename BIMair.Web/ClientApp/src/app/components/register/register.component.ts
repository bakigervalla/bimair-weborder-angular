// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';
import { User } from '../../models/user.model';
import { UserEdit } from '../../models/user-edit.model';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public isSaving = false;
  public showValidationErrors = true;
  public uniqueId: string = Utilities.uniqueId();
  public user: User = new User();
  public userEdit: UserEdit = new UserEdit();
  public allRoles: Role[] = [];

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  @ViewChild('f')
  public form;

  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('userName')
  public userName;

  @ViewChild('userPassword')
  public userPassword;

  @ViewChild('email')
  public email;

   @ViewChild('newPassword')
  public newPassword;

  @ViewChild('confirmPassword')
  public confirmPassword;

  constructor(private alertService: AlertService, private accountService: AccountService) {
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }


  save() {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Saving changes...');
    this.accountService.newUser(this.userEdit).subscribe(user => this.saveSuccessHelper(user), error => this.saveFailedHelper(error));
  }


  private saveSuccessHelper(user?: User) {

    if (user) {
      Object.assign(this.userEdit, user);
    }

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.showValidationErrors = false;

    this.alertService.showMessage('Success', `User \"${this.user.userName}\" was created successfully`, MessageSeverity.success);


    if (this.changesSavedCallback) {
      this.changesSavedCallback();
    }
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



  //newUser(allRoles: Role[]) {
  //  this.isGeneralEditor = true;
  //  this.isNewUser = true;

  //  this.allRoles = [...allRoles];
  //  this.user = this.userEdit = new UserEdit();
  //  this.userEdit.isEnabled = true;
  //  this.edit();

  //  return this.userEdit;
  //}

}
