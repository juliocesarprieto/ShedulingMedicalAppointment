import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingupComponent } from './singup/singup.component';
import { SinginComponent } from './singin/singin.component';
import { AuthGuardService as AuthGuard } from './interceptors';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'home',
                    loadChildren: () => import('./admin/home/home.module')
                                                .then(mod => mod.HomeModule),
                    canActivate: [AuthGuard]
                },
                {
                    path: 'sheduling-appointment',
                    loadChildren: () => import('./admin/sheduling-appointment/sheduling-appointment.module')
                                                .then(mod => mod.ShedulingAppointmentModule),
                    canActivate: [AuthGuard]
                },
                {
                    path: 'doctors',
                    loadChildren: () => import('./admin/doctor/doctor.module').then(mod => mod.DoctorModule),
                    canActivate: [AuthGuard]
                },
                {
                    path: 'sing-in',
                    loadChildren: () => import('./singin/singin.module').then(mod => mod.SinginModule)
                },
                {
                    path: 'sing-up',
                    loadChildren: () => import('./singup/singup.module').then(mod => mod.SingupModule)
                },
                {
                    path: '**',
                    redirectTo: 'sing-in'
                }
            ],
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
