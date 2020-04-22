import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbTypeahead, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter, catchError, switchMap } from 'rxjs/operators';
import { DoctorService, ShedulingAppointmentService, AlertService } from 'src/app/services';
import { Doctor, ShedulingAppointment } from 'src/app/models';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sheduling-appointment',
  templateUrl: './sheduling-appointment.component.html',
  styleUrls: ['./sheduling-appointment.component.css']
})
export class ShedulingAppointmentComponent implements OnInit {

  public doctor: any;
  date: NgbDateStruct;
  today = this.calendar.getToday();
  description: string;

  shedulingAppointment = new ShedulingAppointment();
  form: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private calendar: NgbCalendar,
    private alertService: AlertService,
    private doctorService: DoctorService,
    private shedulingAppointmentService: ShedulingAppointmentService,
    private formBuilder: FormBuilder) {}

   ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      doctor: ['', Validators.required ],
      date: ['', Validators.required ]
    });
  }

  search = (text$: Observable<Doctor[]>) =>
    text$.pipe(
      debounceTime(200),
      switchMap(searchDoctor => this.doctorService.get(searchDoctor)),
      map((doctors: Doctor[]) => doctors['content'].map(doctor => doctor))
    )

    resultFormatBandListValue(value: any) {
      return value.name;
    }

    inputFormatBandListValue(value: any)   {
      if ( value.name ) {
        return value.name;
      }
      return value;
    }

    onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }

      if (this.form.value.doctor.name === undefined) {
        this.form.controls.doctor.setErrors({invalidDoctor : true});
        return;
      }

      this.date = this.form.value.date;

      this.shedulingAppointment.date = new Date(this.date.day, this.date.month, this.date.year);
      this.shedulingAppointment.doctor = this.form.value.doctor;
      this.shedulingAppointment.description = this.form.value.description;

      this.shedulingAppointmentService.register(this.shedulingAppointment).subscribe(res => {
        this.alertSuccess();
        this.router.navigate(['/home'], { skipLocationChange: true });
      }, error => this.alertError(error) );
    }

    alertError(error: any) {
      this.alertService.error(error.message);
    }

    alertSuccess() {
      this.alertService.success('Save successful');
    }
}
