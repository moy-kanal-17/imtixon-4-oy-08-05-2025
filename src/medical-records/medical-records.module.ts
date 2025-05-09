import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './entities/medical-record.entity';

@Module({
  imports: [SequelizeModule.forFeature([MedicalRecord])],
  providers: [MedicalRecordsService],
  controllers: [MedicalRecordsController],
})
export class MedicalRecordsModule {}
