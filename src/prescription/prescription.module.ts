import { Module } from "@nestjs/common";
import { PrescriptionsService } from "./prescription.service";
import { PrescriptionsController } from "./prescription.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.entity";

@Module({
  imports: [SequelizeModule.forFeature([Prescription])],
  providers: [PrescriptionsService],
  controllers: [PrescriptionsController],
})
export class PrescriptionsModule {}
