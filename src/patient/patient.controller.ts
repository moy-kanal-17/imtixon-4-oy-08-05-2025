import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("patient")
export class PatientController { 
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(FileInterceptor("avatar"))
  create(@Body() createPatientDto: CreatePatientDto,@UploadedFile() avatar:any) {
    return this.patientService.create(createPatientDto,avatar);
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

  @UseGuards(AdminGuard)
  @Get("spe/3")
  findByTime(@Body() body: { startTime: Date; finishTime: Date }) {
    const { startTime, finishTime } = body;
    return this.patientService.getPatientsWithinTimeRange(startTime, finishTime);}
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
