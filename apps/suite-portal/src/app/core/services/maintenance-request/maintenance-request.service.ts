import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { environment } from '../../../../environments/environment';
import { localStorageKeys } from '../../constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestService {
  maintenanceRequestsUrl = `${environment.urls.api}/maintenance-requests`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    //
  }

  post(request: MaintenanceRequest) {
    return this.httpClient.post(this.maintenanceRequestsUrl, request, {
      headers: this.headers,
    });
  }

  getAll() {
    return this.httpClient.get(this.maintenanceRequestsUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.localStorageService.retrieve(
          localStorageKeys.TOKEN
        )}`,
      }),
    });
  }

  getById(id: string) {
    return this.httpClient.get(`${this.maintenanceRequestsUrl}/${id}`, {
      headers: this.headers,
    });
  }

  close(id: string) {
    return this.httpClient.get(`${this.maintenanceRequestsUrl}/${id}/close`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.localStorageService.retrieve(
          localStorageKeys.TOKEN
        )}`,
      }),
    });
  }
}
