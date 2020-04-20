import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShedulingAppointmentComponent } from './sheduling-appointment.component';
import { ShedulingAppointmentRoutingModule } from './sheduling-appointment.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ShedulingAppointmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbModule,
    ShedulingAppointmentRoutingModule
  ]
})
export class ShedulingAppointmentModule { }
