import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService, UserService, AlertService, AuthService, ShedulingAppointmentService } from '../services';
import { AlertComponent } from './alert';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DataSharedService } from './data-shared.service';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        AlertComponent,
        NavBarComponent,
        DatePickerComponent
    ],
    providers: [
        DoctorService,
        UserService,
        AlertService,
        AuthService,
        DataSharedService,
        ShedulingAppointmentService
    ],
    exports: [
        AlertComponent,
        NavBarComponent,
        DatePickerComponent
    ]
})
export class SharedModule { }
