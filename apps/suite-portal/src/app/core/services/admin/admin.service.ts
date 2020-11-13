import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { localStorageKeys } from '../../constants';
import { ICredentials } from '../../interfaces';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.urls.api;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    //
  }

  login(credentials: ICredentials) {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials, {
      headers: this.headers,
    });
  }

  checkAuthorized() {
    return this.httpClient.get(`${this.baseUrl}/authorized`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.localStorageService.retrieve(
          localStorageKeys.TOKEN
        )}`,
        'Content-Type': 'application/json',
      }),
    });
  }
}
