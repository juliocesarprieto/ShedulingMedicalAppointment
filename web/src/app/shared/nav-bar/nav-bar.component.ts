import { Component, OnInit, Input, Output } from '@angular/core';
import { DataSharedService } from '../data-shared.service';
import { AuthService } from 'src/app/services';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  hiddenBar: boolean = false;

  constructor(
    private router: Router,
    private dataSharedService: DataSharedService,
    private authService: AuthService) {
    this.dataSharedService.isUserLogged.subscribe(value => {
      this.hiddenBar = value;
     });

    this.hiddenBar = authService.isAuthenticated() ? true : false;
  }

  ngOnInit() {
  }

  logout(event: any) {
    this.authService.logout();
    this.dataSharedService.isUserLogged.next(false);
    this.hiddenBar = false;
    this.router.navigate(['/']);
  }
}
