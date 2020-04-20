import { Component, OnInit, Input } from '@angular/core';
import { DataSharedService } from '../data-shared.service';
import { AuthService } from 'src/app/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() isUserLogged: boolean;

  constructor(private dataSharedService: DataSharedService, private authService: AuthService) {
    this.dataSharedService.isUserLoggedIn.subscribe(value => {
      this.isUserLogged = authService.isAuthenticated();
     });
  }

  ngOnInit() {
  }

//   logout(event: any) {
//     localStorage.setItem('currentUser', null);
//     this.dataSharedService.isUserLoggedIn.next(false);
//     this.router.navigate(['/']);
// }

}
