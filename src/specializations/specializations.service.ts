import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specialization } from './models/specialization.models';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Doctor } from 'src/doctors/models/doctors.models';

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectModel(Specialization)
    private specializationModel: typeof Specialization
  ) {}

  create(
    createSpecializationDto: CreateSpecializationDto
  ): Promise<Specialization> {
    return this.specializationModel.create(
      createSpecializationDto as Partial<Specialization>
    );
  }

  async findAll(): Promise<Specialization[]> {
    return this.specializationModel.findAll();
  }

  async findOne(id: number): Promise<Specialization> {
    const specialization = await this.specializationModel.findByPk(id, {
      include: [
        {
          model: Doctor,
          as: "doctors",
        },
      ],
    });
    if (!specialization) {
      throw new NotFoundException(`Specialization with ID ${id} not found`);
    }
    return specialization;
  }


  async update(
    id: number,
    updateSpecializationDto: UpdateSpecializationDto
  ): Promise<Specialization> {
    const [affectedCount] = await this.specializationModel.update(
      updateSpecializationDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Specialization with ID ${id} not found`);
    }

    const updatedSpecialization = await this.findOne(id);
    return updatedSpecialization;
  }

  async remove(id: number): Promise<void> {
    const specialization = await this.findOne(id);
    await specialization.destroy();
  }
}
