import { LabTestsService } from "./lab_test.service";
import { LabTest } from "./models/lab_test.entity";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
export declare class LabTestsController {
    private readonly labTestsService;
    constructor(labTestsService: LabTestsService);
    create(createLabTestDto: CreateLabTestDto): Promise<LabTest>;
    findAll(): Promise<LabTest[]>;
    findByspec(id: string): Promise<LabTest[]>;
    findOne(id: string): Promise<LabTest>;
    update(id: string, updateLabTestDto: UpdateLabTestDto): Promise<LabTest>;
    remove(id: string): Promise<void>;
}
