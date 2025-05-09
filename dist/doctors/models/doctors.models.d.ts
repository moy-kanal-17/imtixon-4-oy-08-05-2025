import { Model } from 'sequelize-typescript';
import { Specialization } from '../../specializations/models/specialization.models';
export declare class Doctor extends Model {
    id: number;
    first_name: string;
    last_name: string;
    specialization_id: number;
    specialization: Specialization;
    hashed_token: string;
    phone_number: string;
    birthday: Date;
    active_link: boolean;
    gender: string;
    email: string;
    password: string;
    is_active: boolean;
}
