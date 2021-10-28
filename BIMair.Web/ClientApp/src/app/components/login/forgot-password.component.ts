import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup | undefined;
  loading = false;
  submitted = false;
  formResetToggle = true;
  confirmationEmailSent = false;

  public resetSavedCallback: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  forgotPassword() {
    this.submitted = true;

    if (this.resetForm && this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.accountService.forgotPassword(this.f?.email.value)
      .pipe(first())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.forgotSuccessHelper(),
        error: error => this.showErrorAlert('Forgot password', error)
      });
  }

  private forgotSuccessHelper() {

    this.loading = false;
    this.alertService.stopLoadingMessage();
    this.confirmationEmailSent = true

    this.alertService.showMessage('Success', `Please check your email, containing password reset instructions`, MessageSeverity.success);
  }

  showErrorAlert(caption: string, message: string) {
    this.confirmationEmailSent = true
    this.alertService.showMessage(caption, this.mapForgotErrorMessage(message), MessageSeverity.error);
  }

  mapForgotErrorMessage(message: any) {
    let { error } = message;
    if (error === 'email_required') {
      return 'Please enter a valid email address';
    }

    if (error === 'invalid_email') {
      return 'Invalid email';
    }

    let { text } = error;
    if (text)
      return text;

    return error;
  }
}
