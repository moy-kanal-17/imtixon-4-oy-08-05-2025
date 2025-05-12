import { Model } from "sequelize-typescript";
import { MedicalRecord } from "../../medical-records/models/medical-record.entity";
import { Medication } from "../../medications/models/medication.entity";
export declare class Prescription extends Model {
    id: number;
    medical_records_id: number;
    medicalRecord: MedicalRecord;
    medications_id: number;
    medication: Medication;
    name: string;
    descriptions: string;
    allPrice: string;
}
