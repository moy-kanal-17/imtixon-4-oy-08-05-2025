import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { Medication } from "./models/medication.entity";
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    create(createMedicationDto: CreateMedicationDto): Promise<Medication>;
    findAll(): Promise<Medication[]>;
    findOne(id: string): Promise<Medication>;
    update(id: string, updateMedicationDto: UpdateMedicationDto): Promise<Medication>;
    remove(id: string): Promise<void>;
}
