/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { MedicalRecord } from 'src/medical-records/entities/medical-record.entity';
import { Medication } from 'src/medications/entities/medication.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription)
    private prescriptionModel: typeof Prescription,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
    return this.prescriptionModel.create(
      createPrescriptionDto as Partial<Prescription>,
    );
  }

  async findAll(): Promise<Prescription[]> {
try {
      return this.prescriptionModel.findAll({
        include: [
          { model: MedicalRecord, as: 'medicalRecord', attributes: ['name'] },
          { model: Medication, as: 'medication', attributes: ['name'] },
        ],
      });
} catch (error) {
  console.error('Error fetching prescriptions:', error);
  return [];
}
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByPk(id, {
      include: [
        { model: MedicalRecord, as: 'medicalRecord' },
        { model: Medication, as: 'medication' },
      ],
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(
    id: number,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<Prescription> {
    const [affectedCount] = await this.prescriptionModel.update(
      updatePrescriptionDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    const updatedPrescription = await this.findOne(id);
    return updatedPrescription;
  }

  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await prescription.destroy();
  }
}
