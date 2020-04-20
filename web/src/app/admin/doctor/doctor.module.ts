import { NgModule } from '@angular/core';
import { DoctorComponent } from './doctor.component';
import { DoctorService } from '../../services';
import { DoctorRoutingModule } from './doctor.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule {}
