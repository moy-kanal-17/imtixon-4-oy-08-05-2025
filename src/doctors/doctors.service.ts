import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctors.models';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Specialization } from 'src/specializations/models/specialization.models';
import { Op } from 'sequelize';
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor)
    private doctorModel: typeof Doctor,
    @InjectModel(Specialization)
    private specializationModel:typeof Specialization
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({where:{email:createDoctorDto.email}})
    if(doctor){
      console.log(doctor);
      throw new NotFoundException("Doctor bor bunaqa");

    }
    const specialization = await this.specializationModel.findByPk(
      createDoctorDto.specialization_id
    );
    if (!specialization) {
      throw new NotFoundException("Specialization not found");
    }
    const hashedPassword = await bcrypt.hash(createDoctorDto.password!, 10);
    createDoctorDto.password = hashedPassword;
    return this.doctorModel.create(createDoctorDto as Partial<Doctor>);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.findAll({
      include: [
        {
          model: Specialization,
          as: "specialization",
        },
      ],
    });
  }

  async findByspec(specializationId: number): Promise<Doctor[]> {
    return this.doctorModel.findAll({
      include: [
        {
          model: Specialization,
          as: "specialization",
          where: { id: specializationId },
        },
      ],
    });
  }



   async findtime(
      startTime: Date,
      finishTime: Date
    ): Promise<Doctor[]> {
      try {
        const patients = await this.doctorModel.findAll({
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



  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorModel.findByPk(id, {
      include: [
        {
          model: Specialization,
          as: "specialization",
        },
      ],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }
  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const [affectedCount] = await this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    const updatedDoctor = await this.findOne(id);
    return updatedDoctor;
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await doctor.destroy();
  }
}
