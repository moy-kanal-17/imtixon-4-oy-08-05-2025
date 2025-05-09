import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.models';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Appointment } from '../appointments/models/appointment.model';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private patientModel: typeof Patient,
  ) {}
  

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const re= await this.patientModel.findByPk(createPatientDto.email)
    if(re){
      throw new NotFoundException("BU YUSER BOR!")
    }
    return this.patientModel.create(createPatientDto as Partial<Patient>);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.findAll({
      include: [
        {
          model: Appointment,
          as: 'appointments',
        },
      ],
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientModel.findByPk(id, {
      include: [
        {
          model: Appointment,
          as: 'appointments',
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
    updatePatientDto: UpdatePatientDto,
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
