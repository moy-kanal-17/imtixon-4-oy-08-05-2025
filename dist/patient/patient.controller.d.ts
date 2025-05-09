import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(createPatientDto: CreatePatientDto): Promise<import("./models/patient.models").Patient>;
    findAll(): Promise<import("./models/patient.models").Patient[]>;
    findOne(id: string): Promise<import("./models/patient.models").Patient>;
    update(id: string, updatePatientDto: UpdatePatientDto): Promise<import("./models/patient.models").Patient>;
    remove(id: string): Promise<void>;
}
