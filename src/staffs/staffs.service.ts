import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Role } from 'src/role/models/role.model';

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff)
    private staffModel: typeof Staff
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    try {
      return this.staffModel.create(createStaffDto as Partial<Staff>);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createAdmin(createStaffDto: CreateStaffDto): Promise<Staff> {
    try {
      const staffData = {
        ...createStaffDto,
        IsCreator: true,
      };

      const newStaff = await this.staffModel.create(staffData);

      return newStaff;
    } catch (error) {
      console.error("Error creating admin staff:", error);
      throw error;
    }
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.findAll({
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
  }

  async findByspec(rolesid: number): Promise<Staff[]> {
    return this.staffModel.findAll({
      include: [
        {
          model: Role,
          as: "role",
          where: { id: rolesid },
        },
      ],
    });
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffModel.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const [affectedCount] = await this.staffModel.update(updateStaffDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    const updatedStaff = await this.findOne(id);
    return updatedStaff;
  }

  async remove(id: number): Promise<void> {
    const staff = await this.findOne(id);
    await staff.destroy();
  }
}
