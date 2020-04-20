import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbTypeahead, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter, catchError, switchMap } from 'rxjs/operators';
import { DoctorService, ShedulingAppointmentService, AlertService } from 'src/app/services';
import { Doctor, ShedulingAppointment } from 'src/app/models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sheduling-appointment',
  templateUrl: './sheduling-appointment.component.html',
  styleUrls: ['./sheduling-appointment.component.css']
})
export class ShedulingAppointmentComponent {

  public model: any;
  modelDatePicker: NgbDateStruct;
  today = this.calendar.getToday();
  description: string;

  shedulingAppointment = new ShedulingAppointment();

  constructor(
    private router: Router,
    private calendar: NgbCalendar,
    private alertService: AlertService,
    private doctorService: DoctorService,
    private shedulingAppointmentService: ShedulingAppointmentService) {}

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

    searchEvent(evt) {
      console.log(evt);
    }

    actionSave() {
      this.shedulingAppointment.date = new Date(this.modelDatePicker.day, this.modelDatePicker.month, this.modelDatePicker.year);
      this.shedulingAppointment.doctor = this.model;
      this.shedulingAppointment.description = this.description;

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
