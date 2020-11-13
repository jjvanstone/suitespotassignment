import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { MaintenanceRequestsComponent } from './maintenance-requests/maintenance-requests.component';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, LoginComponent, MaintenanceRequestsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
