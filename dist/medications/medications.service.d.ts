import { Medication } from "./models/medication.entity";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
export declare class MedicationsService {
    private medicationModel;
    constructor(medicationModel: typeof Medication);
    create(createMedicationDto: CreateMedicationDto): Promise<Medication>;
    findAll(): Promise<Medication[]>;
    findOne(id: number): Promise<Medication>;
    update(id: number, updateMedicationDto: UpdateMedicationDto): Promise<Medication>;
    remove(id: number): Promise<void>;
}
