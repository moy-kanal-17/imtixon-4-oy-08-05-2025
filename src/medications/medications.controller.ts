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
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Medication } from './entities/medication.entity';
import { DoctorsGuard } from 'src/common/guards/doctors.guard';

@ApiTags("Medications")
@Controller("medications")
@UsePipes(new ValidationPipe())
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Medication,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(DoctorsGuard)
  @Post()
  async create(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<Medication> {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOkResponse({
    description: "List of all medications.",
    type: [Medication],
  })
  @UseGuards(DoctorsGuard)
  @Get()
  async findAll(): Promise<Medication[]> {
    return this.medicationsService.findAll();
  }

  @ApiOkResponse({ description: "Medication found.", type: Medication })
  @ApiNotFoundResponse({ description: "Medication not found." })
  @ApiParam({ name: "id", type: "number", description: "Medication ID" })
  @UseGuards(DoctorsGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Medication> {
    return this.medicationsService.findOne(+id);
  }

  @ApiOkResponse({
    description: "Medication updated successfully.",
    type: Medication,
  })
  @ApiNotFoundResponse({ description: "Medication not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Medication ID" })
  @UseGuards(DoctorsGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ): Promise<Medication> {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @ApiOkResponse({ description: "Medication deleted successfully." })
  @ApiNotFoundResponse({ description: "Medication not found." })
  @ApiParam({ name: "id", type: "number", description: "Medication ID" })
  @UseGuards(DoctorsGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.medicationsService.remove(+id);
    return;
  }
}
