import { PrescriptionsService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./models/prescription.entity";
export declare class PrescriptionsController {
    private readonly prescriptionsService;
    constructor(prescriptionsService: PrescriptionsService);
    create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription>;
    findAll(): Promise<Prescription[]>;
    findOne(id: string): Promise<Prescription>;
    update(id: string, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription>;
    remove(id: string): Promise<void>;
}
