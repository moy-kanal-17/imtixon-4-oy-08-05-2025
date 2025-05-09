import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreatePatientDto } from "src/patient/dto/create-patient.dto";
import { CreateDoctorDto } from "src/doctors/dto/create-doctor.dto";
import { CreateStaffDto } from "src/staffs/dto/create-staff.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: CreatePatientDto | CreateDoctorDto | CreateStaffDto): Promise<import("../patient/models/patient.models").Patient | import("../doctors/models/doctors.models").Doctor | import("../staffs/models/staff.model").Staff | null>;
    login(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    activate(token: string): Promise<{
        message: string;
    }>;
    refreshToken(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
}
