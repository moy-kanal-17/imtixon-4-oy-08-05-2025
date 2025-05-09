import { Model } from 'sequelize-typescript';
import { Patient } from 'src/patient/models/patient.models';
export declare class Payment extends Model {
    id: number;
    patient_id: number;
    patient: Patient;
    price: number;
    terminal: string;
    date: Date;
    method: string;
}
