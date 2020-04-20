import { Doctor } from './doctor';

export class ShedulingAppointment {
    id: number;
    description: string;
    doctor: Doctor;
    date: Date;
}
