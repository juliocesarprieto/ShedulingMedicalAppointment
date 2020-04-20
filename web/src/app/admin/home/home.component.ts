import { Component, OnInit } from '@angular/core';
import { ShedulingAppointment } from './../../models';
import { ShedulingAppointmentService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filter = '';
  totalElements = 0;
  shedulingsAppointments: ShedulingAppointment;

  constructor(private shedulingAppoimentService: ShedulingAppointmentService, private alertService: AlertService) { }

  ngOnInit() {
    this.shedulingAppoimentService.get().subscribe(res => {
      this.loadData(res);
    }, error => {
      this.error(error);
    });
  }

  search() {
    this.shedulingAppoimentService.get(this.filter).subscribe(res => {
      this.loadData(res);
    }, error => {
      this.error(error);
    });
  }

  loadData(result: any) {
    this.shedulingsAppointments = result['content'];
    this.totalElements = result['totalElements'];
  }

  deleteSheduling(shedulingMedical: any) {
    this.shedulingAppoimentService.remove(shedulingMedical.id).subscribe(res => {
      this.alertService.success('Removed with successful!');
      this.search();
    }, error => ( this.error(error)));
  }

  error(error: any) {
    this.alertService.error(error.message);
  }

}
