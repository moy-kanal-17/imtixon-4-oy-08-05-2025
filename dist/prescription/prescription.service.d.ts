import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
export declare class PrescriptionsService {
    private prescriptionModel;
    constructor(prescriptionModel: typeof Prescription);
    create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription>;
    findAll(): Promise<Prescription[]>;
    findOne(id: number): Promise<Prescription>;
    update(id: number, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription>;
    remove(id: number): Promise<void>;
}
