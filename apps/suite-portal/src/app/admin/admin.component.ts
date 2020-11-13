import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../core/services';

@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  checkingAuth = true;
  constructor(private router: Router, private adminService: AdminService) {
    //
  }

  ngOnInit(): void {
    this.adminService
      .checkAuthorized()
      .toPromise()
      .then(() => {
        // User is authorized and can proceed
        this.checkingAuth = false;
      })
      .catch((err) => {
        this.checkingAuth = false;
        if (err) {
          switch (err.status) {
            default:
              // Todo: handle other errors
              break;
            case 401:
              this.router.navigate(['admin/login']);
              break;
          }
        }
      });
  }
}
