import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MaintenanceRequest,
  MaintenanceRequestStatus,
} from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from '../../core/services';
import { SubSink } from 'subsink';

@Component({
  selector: 'sp-maintenance-requests',
  templateUrl: './maintenance-requests.component.html',
  styleUrls: ['./maintenance-requests.component.scss'],
})
export class MaintenanceRequestsComponent implements OnInit, OnDestroy {
  // Subsink to help unsubscribe from a bunch of subscriptions at once
  subs = new SubSink();
  displayedColumns: string[] = [
    'name',
    'email',
    'unitNumber',
    'summary',
    'details',
    'status',
  ];

  maintenanceRequests: MaintenanceRequest[] = [];
  constructor(private maintenanceRequestService: MaintenanceRequestService) {
    //
  }

  ngOnInit(): void {
    this.subs.sink = this.maintenanceRequestService
      .getAll()
      .subscribe((result: MaintenanceRequest[]) => {
        this.maintenanceRequests = result;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toggleStatus(maintenanceRequest: MaintenanceRequest) {
    if (maintenanceRequest.status === MaintenanceRequestStatus.OPEN) {
      this.maintenanceRequestService
        .close(maintenanceRequest.id)
        .toPromise()
        .then((result: MaintenanceRequest) => {
          const maintenanceRequestInTable = this.maintenanceRequests.find(
            (x) => x.id === result.id
          );

          maintenanceRequestInTable.status = result.status;
        });
    }
  }
}
