import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './entities/lab_test.entity';
import { LabTestsController } from './lab_test.controller';
import { LabTestsService } from './lab_test.service';

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  providers: [LabTestsService],
  controllers: [LabTestsController],
})
export class LabTestsModule {}
