import { JwtService } from '@nestjs/jwt';
import { Doctor } from 'src/doctors/models/doctors.models';
import { Staff } from 'src/staffs/models/staff.model';
import { Patient } from 'src/patient/models/patient.models';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { CreateDoctorDto } from '../doctors/dto/create-doctor.dto';
import { CreateStaffDto } from '../staffs/dto/create-staff.dto';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private readonly mailService;
    private readonly patientModel;
    private readonly doctorModel;
    private readonly staffModel;
    private readonly jwtService;
    constructor(mailService: MailService, patientModel: typeof Patient, doctorModel: typeof Doctor, staffModel: typeof Staff, jwtService: JwtService);
    register(registerDto: CreatePatientDto | CreateDoctorDto | CreateStaffDto, role: string): Promise<Patient | Doctor | Staff | null>;
    login(email: string, password: string, role: "patient" | "doctor" | "staff" | "admin" | "creator", res: Response): Promise<{
        access_token: string;
    }>;
    activateUser(token: string): Promise<{
        message: string;
        type: string;
    }>;
    refreshToken(refresh_token: string, res: Response): Promise<{
        access_token: string;
    }>;
}
