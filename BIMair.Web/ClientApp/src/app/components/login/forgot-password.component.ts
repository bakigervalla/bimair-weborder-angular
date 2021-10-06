import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

// import { AccountService, AlertService } from '@app/_services';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';

@Component({ templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup | undefined;
  loading = false;
  submitted = false;

  public resetSavedCallback: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  reset() {
    this.submitted = true;

    if (this.form && this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.accountService.resetPassword(this.f?.email.value)
      .pipe(first())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.resetSuccessHelper(),
        error: error => this.showErrorAlert('Reset password', error)
      });
  }

  private resetSuccessHelper() {

    this.loading = false;
    this.alertService.stopLoadingMessage();

    this.alertService.showMessage('Success', `Please check your email, containing password reset instructions`, MessageSeverity.success);


      this.resetSavedCallback();

  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  forgot() {
    this.loading = true;
    this.alertService.startLoadingMessage('', 'Attempting forgot password reset...');
  }


  mapLoginErrorMessage(error: string) {

    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    if (error === 'invalid_grant') {
      return 'This account has been disabled';
    }

    return error;
  }

}
