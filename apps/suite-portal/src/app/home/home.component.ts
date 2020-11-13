import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MaintenanceRequestService } from '../core/services/maintenance-request/maintenance-request.service';
import { timeout } from '../core/utils/timeout.util';

import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  maintenanceRequestForm: FormGroup;
  requiredFieldErrorMessage = 'This field is required.';
  submitting = false;
  submitted = false;
  requestError = false;

  constructor(
    private formBuilder: FormBuilder,
    private maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.maintenanceRequestForm = this.formBuilder.group({
      unitNumber: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      serviceType: [null, Validators.required],
      summary: [null, Validators.required],
      details: [null],
    });
  }

  submitMaintenanceRequest(
    value: MaintenanceRequest,
    formDirective: FormGroupDirective
  ) {
    if (this.maintenanceRequestForm.valid) {
      this.submitting = true;
      this.maintenanceRequestService
        .post(value)
        .toPromise()
        .then(() => {
          this.submitted = true;
          this.maintenanceRequestForm.reset();
          // Need to reset the ngForm as well (https://stackoverflow.com/questions/48216330/angular-5-formgroup-reset-doesnt-reset-validators)
          formDirective.resetForm();
          timeout(3000).then(() => {
            this.submitting = false;
          });
        })
        .catch(() => {
          // Show something on error
          this.submitting = false;
          this.requestError = true;
        });
    }
  }
}
