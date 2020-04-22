import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService, AlertService } from 'src/app/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from 'src/app/models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.css']
})
export class DoctorUpdateComponent implements OnInit {

  editMode = false;
  doctorId: any;
  doctor: any;
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private alertService: AlertService) {
      this.doctorId = this.activedRoute.snapshot.paramMap.get('id');

      if (this.doctorId) {
          this.editMode = true;
          this.doctorService.findById(this.doctorId).subscribe(res => {
            this.doctor = res;
            this.loadData(this.doctor);
          }, error => {
            this.error(error);
          });
      }
    }

  ngOnInit() {
    this.loadData(this.doctor);
  }

   loadData(doctor: any) {
     this.form = this.formBuilder.group({
          name: [
              doctor && doctor.name !== undefined ? doctor.name : '',
              Validators.compose([
                Validators.required
            ]),
          ],
          email: [
            doctor && doctor.email !== undefined ? doctor.email : '',
            Validators.compose([
                Validators.required,
                Validators.pattern(
                    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)$/i
                )
            ]),
        ],
        phone: [
          doctor && doctor.phone !== undefined ? doctor.phone : ''
        ]
    });
   }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      const doctorUpdate = this.form.value;
      doctorUpdate.id = this.doctor.id;
      this.doctorService.update(this.form.value).subscribe(res => {
        this.router.navigate(['/doctors'], { skipLocationChange: true });
        this.saveSuccess();
      }, error => {
        this.saveError(error);
      });
    } else {
      this.doctorService.register(this.form.value).subscribe(res => {
        this.router.navigate(['/doctors'], { skipLocationChange: true });
        this.saveSuccess();
      }, error => {
        this.saveError(error);
      });
    }
  }

  saveError(error: any) {
    this.alertService.error(error.message);
  }

  saveSuccess() {
    this.alertService.success('Save successful');
  }

  error(error: any) {
    this.alertService.error(error.message);
  }

}
