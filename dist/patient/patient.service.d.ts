import { Patient } from './models/patient.models';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientService {
    private patientModel;
    constructor(patientModel: typeof Patient);
    create(createPatientDto: CreatePatientDto): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    remove(id: number): Promise<void>;
}
