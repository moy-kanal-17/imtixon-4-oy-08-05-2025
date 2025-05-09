import { Model } from 'sequelize-typescript';
import { Patient } from '../../patient/models/patient.models';
import { Doctor } from '../../doctors/models/doctors.models';
export declare class Appointment extends Model {
    id: number;
    Patients_id: number;
    patient: Patient;
    doctor_id: number;
    doctor: Doctor;
    price: number;
    date: Date;
    status: string;
    adress: string;
}
