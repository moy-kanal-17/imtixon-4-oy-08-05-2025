import { Model } from 'sequelize-typescript';
import { Doctor } from '../../doctors/models/doctors.models';
import { Patient } from '../../patient/models/patient.models';
export declare class MedicalRecord extends Model {
    id: number;
    doctor_id: number;
    doctor: Doctor;
    patient_id: number;
    patient: Patient;
    result: string;
    notes: string;
    name: string;
    descriptions: string;
}
