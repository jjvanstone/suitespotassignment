import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageKeys } from './core/constants';
import { AdminService, LocalStorageService } from './core/services';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'suite-portal';
  loggedIn = false;

  constructor(
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    //
  }

  ngOnInit() {
    // This should be handled by app state management using something
    // like ngrx, but running out of time.
    this.adminService
      .checkAuthorized()
      .toPromise()
      .then(() => {
        this.loggedIn = true;
      })
      .catch((err) => {
        switch (err.status) {
          case 401:
            this.loggedIn = false;
            break;
        }
      });
  }

  logout() {
    this.localStorageService.remove(localStorageKeys.TOKEN);
    this.router.navigate(['/admin']);
    window.location.reload();
  }
}
