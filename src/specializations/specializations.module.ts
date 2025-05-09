import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsController } from './specializations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialization } from './models/specialization.models';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
  imports: [SequelizeModule.forFeature([Specialization]),StaffsModule],
  controllers: [SpecializationsController],
  providers: [SpecializationsService,SelfOrStaffGuard],
})
export class SpecializationsModule {}
