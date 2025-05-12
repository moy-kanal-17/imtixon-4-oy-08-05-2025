import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import { LabTest } from "./models/lab_test.entity";
export declare class LabTestsService {
    private labTestModel;
    constructor(labTestModel: typeof LabTest);
    create(createLabTestDto: CreateLabTestDto): Promise<LabTest>;
    findAll(): Promise<LabTest[]>;
    findOne(id: number): Promise<LabTest>;
    findByspec(rolesid: number): Promise<LabTest[]>;
    update(id: number, updateLabTestDto: UpdateLabTestDto): Promise<LabTest>;
    remove(id: number): Promise<void>;
}
