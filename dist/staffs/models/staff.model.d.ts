import { Model } from 'sequelize-typescript';
import { Role } from '../../role/models/role.model';
export declare class Staff extends Model {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
    hashed_token: string;
    activation_token: string;
    IsCreator?: boolean;
    roles_id: number;
    role: Role;
}
