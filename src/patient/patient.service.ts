import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.models';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Appointment } from '../appointments/models/appointment.model';
import { FileService } from 'src/file/file.service';
import * as bcrypt from "bcrypt";
import { Op } from 'sequelize';
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private patientModel: typeof Patient,
    private fileservice: FileService
  ) {}

  async create(createPatientDto: CreatePatientDto, avatar: any) {
    const re = await this.patientModel.findOne({
      where: { email: createPatientDto.email },
    });
    if (re) {
      throw new NotFoundException("BU YUSER BOR!");
    }
    const fileName = await this.fileservice.saveImage(avatar.buffer);
    console.log(fileName);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createPatientDto.password!,
      saltRounds
    );
    createPatientDto.password = hashedPassword;
    return this.patientModel.create({ ...createPatientDto, avatar: fileName });
  }

  async getPatientsWithinTimeRange(
    startTime: Date,
    finishTime: Date
  ): Promise<Patient[]> {
    try {
      const patients = await this.patientModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(startTime), new Date(finishTime)],
          },
          is_active: true,
      }});
      return patients;
    } catch (error) {
      console.error("Bemorlarni vaqt oralig'ida olishda xatolik:", error);
      throw new Error("Bemorlarni olishda xatolik yuz berdi");
    }
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.findAll({
      include: [
        {
          model: Appointment,
          as: "appointments",
        },
      ],
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientModel.findByPk(id, {
      include: [
        {
          model: Appointment,
          as: "appointments",
        },
      ],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto
  ): Promise<Patient> {
    const [affectedCount] = await this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    const updatedPatient = await this.findOne(id);
    return updatedPatient;
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await patient.destroy();
  }
}
