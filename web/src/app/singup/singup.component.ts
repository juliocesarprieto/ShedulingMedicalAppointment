import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../services';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  form: FormGroup;
  user = new User();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

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
      ],
      name: ['',
        Validators.compose([
          Validators.required
        ])
       ]
    });
  }

  onSubmit() {
    this.userService.register(this.form.value).subscribe(res => {
      this.router.navigate(['/'], { skipLocationChange: true });
      this.saveSuccess();
    }, error => {
      this.saveError(error);
    });
  }

  cancel() {
    this.router.navigate(['/'], { skipLocationChange: true });
  }

  saveSuccess() {
    this.alertService.success('Save successful');
  }

  saveError(error: any) {
    this.alertService.error(error.message);
  }

}
