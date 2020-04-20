import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorUpdateComponent } from './doctor-update.component';
import { DoctorUpdateRoutingModule } from './doctor-update.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [DoctorUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorUpdateRoutingModule,
    SharedModule
  ]
})
export class DoctorUpdateModule {}
