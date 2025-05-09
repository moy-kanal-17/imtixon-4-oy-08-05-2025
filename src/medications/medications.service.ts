import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Medication } from './entities/medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Prescription } from 'src/prescription/entities/prescription.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication)
    private medicationModel: typeof Medication,
  ) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    return this.medicationModel.create(
      createMedicationDto as Partial<Medication>,
    );
  }

  async findAll(): Promise<Medication[]> {
    return this.medicationModel.findAll();
  }

  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationModel.findByPk(id, {
      include: [{ model: Prescription, as: 'prescriptions' }],
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return medication;
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    const [affectedCount] = await this.medicationModel.update(
      updateMedicationDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }

    const updatedMedication = await this.findOne(id);
    return updatedMedication;
  }

  async remove(id: number): Promise<void> {
    const medication = await this.findOne(id);
    await medication.destroy();
  }
}
