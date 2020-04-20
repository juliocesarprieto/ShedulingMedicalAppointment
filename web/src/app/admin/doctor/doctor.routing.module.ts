import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
      path: '',
      component: DoctorComponent
    },
    {
      path: 'add',
      loadChildren: () => import('./doctor-update/doctor-update.module').then(mod => mod.DoctorUpdateModule)
    },
    {
      path: ':id/edit',
      loadChildren: () => import('./doctor-update/doctor-update.module').then(mod => mod.DoctorUpdateModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule {}
