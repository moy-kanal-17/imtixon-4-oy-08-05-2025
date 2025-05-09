import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './entities/medical-record.entity';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Doctor } from 'src/doctors/models/doctors.models';
import { Patient } from 'src/patient/models/patient.models';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord)
    private medicalRecordModel: typeof MedicalRecord,
  ) {}

  async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    return this.medicalRecordModel.create(
      createMedicalRecordDto as Partial<MedicalRecord>,
    );
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordModel.findAll({
      include: [
        {
          model: Doctor,
          as: 'doctor',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Patient,
          as: 'patient',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
  }

  async findOne(id: number): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordModel.findByPk(id, {
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Patient, as: 'patient' },
      ],
    });
    if (!medicalRecord) {
      throw new NotFoundException(`Medical record with ID ${id} not found`);
    }
    return medicalRecord;
  }

  async update(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const [affectedCount] = await this.medicalRecordModel.update(
      updateMedicalRecordDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Medical record with ID ${id} not found`);
    }

    const updatedMedicalRecord = await this.findOne(id);
    return updatedMedicalRecord;
  }

  async remove(id: number): Promise<void> {
    const medicalRecord = await this.findOne(id);
    await medicalRecord.destroy();
  }
}
