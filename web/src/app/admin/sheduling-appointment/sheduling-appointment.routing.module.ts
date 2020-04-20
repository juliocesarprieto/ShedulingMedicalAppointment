import { Routes, RouterModule } from '@angular/router';
import { ShedulingAppointmentComponent } from './sheduling-appointment.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ShedulingAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShedulingAppointmentRoutingModule {}
