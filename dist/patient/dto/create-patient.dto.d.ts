export declare class CreatePatientDto {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    gender?: string;
    phone_number: string;
    hashed_token?: string;
    birthday?: Date;
    is_active?: boolean;
    active_link?: string;
    avatar: string;
}
