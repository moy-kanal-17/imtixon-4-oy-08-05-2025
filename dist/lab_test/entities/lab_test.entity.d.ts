import { Model } from 'sequelize-typescript';
import { Patient } from 'src/patient/models/patient.models';
export declare class LabTest extends Model {
    id: number;
    patient_id: number;
    patient: Patient;
    name: string;
    result: string;
    descriptions: string;
    data: Date;
}
