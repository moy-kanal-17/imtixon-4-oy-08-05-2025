import { Model } from 'sequelize-typescript';
import { Doctor } from '../../doctors/models/doctors.models';
export declare class Specialization extends Model {
    id: number;
    name: string;
    descriptions: string;
    doctors: Doctor[];
}
