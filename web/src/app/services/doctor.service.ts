import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models';

@Injectable()
export class DoctorService {
    apiUrl = 'http://localhost:8080/doctors/';

    constructor(private http: HttpClient) {}

    register(doctor: Doctor) {
        return this.http.post<Doctor>(`${this.apiUrl}`, doctor);
    }

    get(filter: any = '') {
        return this.http.get<Doctor[]>(`${this.apiUrl}` + '?filter=' + filter);
    }

    findById(doctorId: number) {
        return this.http.get<Doctor>(`${this.apiUrl + doctorId}`);
    }

    update(doctor: Doctor) {
        return this.http.put<Doctor>(`${this.apiUrl}`, doctor);
    }

    remove(doctorId: number) {
        return this.http.delete(`${this.apiUrl}` + doctorId);
    }
}
