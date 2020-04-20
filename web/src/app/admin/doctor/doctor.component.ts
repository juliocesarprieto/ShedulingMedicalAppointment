import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models';
import { DoctorService } from 'src/app/services';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor;
  page = 1;
  filter = '';
  totalElements = 0;

  constructor(private doctorService: DoctorService, private alertService: AlertService) { }

  ngOnInit() {
    this.doctorService.get().subscribe(res => {
      this.loadData(res);
    }, error => {
      this.error(error);
    });
  }

  search(event) {
    this.doctorService.get(this.filter).subscribe(res => {
      this.loadData(res);
    }, error => {
      this.error(error);
    });
  }

  loadData(result: any) {
    this.doctors = result['content'];
    this.totalElements = result['totalElements'];
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorService.remove(doctor.id).subscribe(res => {
      this.alertService.success('Doctor removed successful!');
      this.search(null);
    }, error => {
      this.error(error);
    })
  }

  error(error: any) {
    this.alertService.error(error.message);
  }

}
