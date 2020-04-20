import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services';
import { DataSharedService } from '../shared/data-shared.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
      public auth: AuthService,
      public router: Router,
      private dataSharedService: DataSharedService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
        this.dataSharedService.isUserLoggedIn.next(false);
        this.router.navigate(['/']);
        return false;
    }
    return true;
  }
}
