import { Module } from '@nestjs/common';
import { RolesService } from './role.service';
import { RolesController } from './role.controller';
import { Role } from './models/role.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
  imports: [SequelizeModule.forFeature([Role]),StaffsModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RoleModule {}
