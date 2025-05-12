import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Specialization } from "./models/specialization.models"; 
import { SpecializationsService } from "./specializations.service";
import { SpecializationsController } from "./specializations.controller";

@Module({
  imports: [SequelizeModule.forFeature([Specialization])],
  controllers: [SpecializationsController],
  providers: [SpecializationsService],
  exports: [SequelizeModule, SpecializationsService], 
})
export class SpecializationsModule {}
