import { Model } from 'sequelize-typescript';
import { Appointment } from '../../appointments/models/appointment.model';
export declare class Patient extends Model {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: string;
    gender?: string;
    phone_number: string;
    hashed_token?: string;
    birthday?: Date;
    is_active: boolean;
    active_link?: string;
    appointments: Appointment[];
}
