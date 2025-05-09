import { Model } from "sequelize-typescript";
export declare class Mail extends Model<Mail> {
    user_id: number;
    email: string;
    otp: string;
}
