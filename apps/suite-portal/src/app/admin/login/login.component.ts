import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICredentials } from '../../core/interfaces';
import { AdminService, LocalStorageService } from '../../core/services';
import { localStorageKeys } from '../../core/constants';
import { Router } from '@angular/router';

interface ILoginResult {
  access_token: string;
}

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  requiredFieldErrorMessage = 'This field is required.';
  invalidLogin = false;
  serverError = false;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(value: ICredentials) {
    if (this.loginForm.valid) {
      this.submitting = true;
      this.adminService
        .login(value)
        .toPromise()
        .then(({ access_token }: ILoginResult) => {
          this.submitting = false;
          this.localStorageService.store(localStorageKeys.TOKEN, access_token);

          // Shouldn't be needed if we used app state management
          this.router.navigate(['/admin']).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          this.submitting = false;
          switch (err.status) {
            case 401:
              this.invalidLogin = true;
              break;
            default:
              this.serverError = true;
              break;
          }
        });
    }
  }
}
