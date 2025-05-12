import { Module } from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { MedicationsController } from "./medications.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medication } from "./models/medication.entity";

@Module({
  imports: [SequelizeModule.forFeature([Medication])],
  providers: [MedicationsService],
  controllers: [MedicationsController],
})
export class MedicationsModule {}
