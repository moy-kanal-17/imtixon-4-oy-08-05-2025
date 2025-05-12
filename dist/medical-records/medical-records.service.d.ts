import { MedicalRecord } from "./models/medical-record.entity";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
export declare class MedicalRecordsService {
    private medicalRecordModel;
    constructor(medicalRecordModel: typeof MedicalRecord);
    create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord>;
    findAll(): Promise<MedicalRecord[]>;
    findOne(id: number): Promise<MedicalRecord>;
    update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord>;
    remove(id: number): Promise<void>;
}
