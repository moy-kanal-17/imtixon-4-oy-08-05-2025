import { Model } from "sequelize-typescript";
interface OtpAttributes {
    id: number;
    userId: number;
    email: string;
    otp: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface OtpCreationAttributes extends Pick<OtpAttributes, "userId" | "email" | "otp"> {
}
export declare class Otp extends Model<OtpAttributes, OtpCreationAttributes> implements OtpAttributes {
    id: number;
    userId: number;
    email: string;
    otp: string;
}
export {};
