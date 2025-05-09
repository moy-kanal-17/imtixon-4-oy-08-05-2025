/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { Staff } from './models/staff.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';

@Module({
  imports: [SequelizeModule.forFeature([Staff])],
  
  controllers: [StaffsController],
  providers: [StaffsService],
  exports:[StaffsService]
})
export class StaffsModule {}
