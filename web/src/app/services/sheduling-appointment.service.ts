import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShedulingAppointment } from '../models';

@Injectable()
export class ShedulingAppointmentService {
    apiUrl = 'http://localhost:8080/sheduling_appointments/';

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
