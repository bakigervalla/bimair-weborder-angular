import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';

import { MustMatch } from '../../helpers/confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup | undefined;
  loading = false;
  submitted = false;
  formResetToggle = true;
  confirmationResetSucceed = false;
  token = "";
  email = "";

  public resetSavedCallback: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
    this.route.queryParams
      .subscribe(params => {
        this.token = decodeURIComponent(params.result.replace(/\+/g, '%20'))
        this.email = params.email;
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  resetPassword() {
    this.submitted = true;

    if (this.resetForm && this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    var resetPasswordModel = {
      password: this.f?.newPassword.value,
      confirmPassword: this.f?.confirmPassword.value,
      token: this.token,
      email: this.email
    };

    this.accountService.resetPassword(resetPasswordModel)
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
    this.confirmationResetSucceed = true;

    this.alertService.showMessage('Success', `Your password is changed, please login now.`, MessageSeverity.success);
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, this.mapResetErrorMessage(message), MessageSeverity.error);
  }

  mapResetErrorMessage(err: any) {
    let { error } = err;
    if (error === 'required_fields') {
      return 'Missing required fields';
    }

    if (error === 'invalid_email') {
      return 'Invalid information provided';
    }

    return error;
  }
}
