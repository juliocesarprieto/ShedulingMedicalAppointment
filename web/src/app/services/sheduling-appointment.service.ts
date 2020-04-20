import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShedulingAppointment } from '../models';
import { environment as env } from './../../environments/environment';

@Injectable()
export class ShedulingAppointmentService {
    apiUrl = env.apiUrl + '/sheduling_appointments/';

    constructor(private http: HttpClient) {}

    register(shedulingAppointment: ShedulingAppointment) {
        return this.http.post<ShedulingAppointment>(`${this.apiUrl}`, shedulingAppointment);
    }

    get(filter: any = '') {
        return this.http.get<ShedulingAppointment[]>(`${this.apiUrl}` + '?filter=' + filter);
    }

    remove(shedulingAppointmentId: number) {
        return this.http.delete((`${this.apiUrl}` + shedulingAppointmentId));
    }
}
