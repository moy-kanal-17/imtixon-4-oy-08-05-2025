import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreatePatientDto } from "src/patient/dto/create-patient.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: CreatePatientDto): Promise<import("../patient/models/patient.models").Patient | undefined>;
    login(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    activate(token: string): Promise<{
        message: string;
        type: string;
    }>;
    refreshToken(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
}
