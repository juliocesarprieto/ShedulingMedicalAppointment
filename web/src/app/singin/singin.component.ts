import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSharedService } from '../shared/data-shared.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  form: FormGroup;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private dataSharedService: DataSharedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['',
          Validators.compose([
            Validators.required,
            Validators.minLength(5)
        ]),
      ],
      email: ['', Validators.compose([
                Validators.required,
                Validators.pattern(
                    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)$/i
                )]),
      ]
    });
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(res => {
        this.authService.successfulLogin(res.headers.get('Authorization'));
        this.dataSharedService.isUserLogged.next(true);
        this.router.navigate(['/home']);
    }, error => {this.loginError(error); });
  }

  loginError(error: any) {
    this.alertService.error(error.message);
  }

}
