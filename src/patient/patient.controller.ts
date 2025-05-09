import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';

@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }
  @UseGuards(SelfOrStaffGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @UseGuards(SelfOrStaffGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @UseGuards(SelfOrStaffGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }
}
