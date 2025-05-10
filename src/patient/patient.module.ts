import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './models/patient.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffsModule } from 'src/staffs/staffs.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Patient]),FileModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
