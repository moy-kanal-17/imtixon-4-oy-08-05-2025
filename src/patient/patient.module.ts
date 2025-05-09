import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './models/patient.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
