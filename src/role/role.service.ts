import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(createRoleDto as Partial<Role>);
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const [affectedCount] = await this.roleModel.update(updateRoleDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    const updatedRole = await this.findOne(id);
    return updatedRole;
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await role.destroy();
  }
}
