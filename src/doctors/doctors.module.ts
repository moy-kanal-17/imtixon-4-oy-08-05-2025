import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctors.models';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
