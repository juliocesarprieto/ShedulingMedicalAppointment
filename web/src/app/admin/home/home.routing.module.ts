import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuardService as AuthGuard } from '../../interceptors';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'doctors',
      loadChildren: () => import('../doctor/doctor.module').then(mod => mod.DoctorModule),
      canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
