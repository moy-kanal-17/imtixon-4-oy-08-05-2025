import { Model } from 'sequelize-typescript';
import { Staff } from '../../staffs/models/staff.model';
export declare class Role extends Model {
    id: number;
    name: string;
    descriptions: string;
    staffs: Staff[];
}
