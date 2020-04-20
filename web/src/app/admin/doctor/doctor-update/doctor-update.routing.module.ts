import { Routes, RouterModule } from '@angular/router';
import { DoctorUpdateComponent } from './doctor-update.component';
import { NgModule } from '@angular/core';
import { DoctorUpdateModule } from './doctor-update.module';

const routes: Routes = [
  {
    path: '',
    component: DoctorUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorUpdateRoutingModule {}
