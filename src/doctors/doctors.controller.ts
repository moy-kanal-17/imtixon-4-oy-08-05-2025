import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Doctor } from './models/doctors.models';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';
import { PatientGuard } from 'src/common/guards/patient.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags("Doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Doctor,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(AdminGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOkResponse({ description: "List of all doctors.", type: [Doctor] })
  @UseGuards(AdminGuard)
  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @UseGuards(SelfOrStaffGuard)
  @ApiOkResponse({ description: "Doctor found.", type: Doctor })
  @ApiNotFoundResponse({ description: "Doctor not found." })
  @ApiParam({ name: "id", type: "number", description: "Doctor ID" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Doctor> {
    return this.doctorsService.findOne(+id);
  }

  @ApiOkResponse({ description: "Doctor updated successfully.", type: Doctor })
  @ApiNotFoundResponse({ description: "Doctor not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Doctor ID" })
  @UsePipes(new ValidationPipe())
  @UseGuards(SelfOrStaffGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ): Promise<Doctor> {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @UseGuards(PatientGuard)
  @Get("spe/:id")
  async findbyspec(@Param("id") id: string) {
    return this.doctorsService.findByspec(+id);
  }

  @UseGuards(AdminGuard)
  @Get("spec/3")
  findByTime(@Body() body: { startTime: Date; finishTime: Date }) {
    const { startTime, finishTime } = body;
    return this.doctorsService.findtime(startTime, finishTime);
  }

  @UseGuards(SelfOrStaffGuard)
  @ApiOkResponse({ description: "Doctor deleted successfully." })
  @ApiNotFoundResponse({ description: "Doctor not found." })
  @ApiParam({ name: "id", type: "number", description: "Doctor ID" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.doctorsService.remove(+id);
    return;
  }
}
