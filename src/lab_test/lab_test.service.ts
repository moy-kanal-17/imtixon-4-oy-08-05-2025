import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import { Patient } from "src/patient/models/patient.models";
import { LabTest } from "./models/lab_test.entity";

@Injectable()
export class LabTestsService {
  constructor(
    @InjectModel(LabTest)
    private labTestModel: typeof LabTest
  ) {}

  async create(createLabTestDto: CreateLabTestDto): Promise<LabTest> {
    return this.labTestModel.create(createLabTestDto as Partial<LabTest>);
  }

  async findAll(): Promise<LabTest[]> {
    return this.labTestModel.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  async findOne(id: number): Promise<LabTest> {
    const labTest = await this.labTestModel.findByPk(id, {
      include: [{ model: Patient, as: "patient" }],
    });
    if (!labTest) {
      throw new NotFoundException(`Lab test with ID ${id} not found`);
    }
    return labTest;
  }

  async findByspec(rolesid: number): Promise<LabTest[]> {
    return this.labTestModel.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          where: { id: rolesid },
        },
      ],
    });
  }

  async update(
    id: number,
    updateLabTestDto: UpdateLabTestDto
  ): Promise<LabTest> {
    const [affectedCount] = await this.labTestModel.update(updateLabTestDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Lab test with ID ${id} not found`);
    }

    const updatedLabTest = await this.findOne(id);
    return updatedLabTest;
  }

  async remove(id: number): Promise<void> {
    const labTest = await this.findOne(id);
    await labTest.destroy();
  }
}
