import { Model } from 'sequelize-typescript';
import { Prescription } from 'src/prescription/entities/prescription.entity';
export declare class Medication extends Model {
    id: number;
    name: string;
    descriptions: string;
    price: number;
    prescriptions: Prescription[];
}
