import { Patient } from './models/patient.models';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FileService } from 'src/file/file.service';
export declare class PatientService {
    private patientModel;
    private fileservice;
    constructor(patientModel: typeof Patient, fileservice: FileService);
    create(createPatientDto: CreatePatientDto, avatar: any): Promise<Patient>;
    getPatientsWithinTimeRange(startTime: Date, finishTime: Date): Promise<Patient[]>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    remove(id: number): Promise<void>;
}
