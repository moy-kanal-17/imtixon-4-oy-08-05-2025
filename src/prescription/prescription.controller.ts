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
import { PrescriptionsService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Prescription } from './entities/prescription.entity';
import { DoctorsGuard } from 'src/common/guards/doctors.guard';

@ApiTags("Prescriptions")
@Controller("prescriptions")
@UsePipes(new ValidationPipe())
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Prescription,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(DoctorsGuard)
  @Post()
  async create(
    @Body() createPrescriptionDto: CreatePrescriptionDto
  ): Promise<Prescription> {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @ApiOkResponse({
    description: "List of all prescriptions.",
    type: [Prescription],
  })
  @UseGuards(DoctorsGuard)
  @Get()
  async findAll(): Promise<Prescription[]> {
    return this.prescriptionsService.findAll();
  }

  @ApiOkResponse({ description: "Prescription found.", type: Prescription })
  @ApiNotFoundResponse({ description: "Prescription not found." })
  @ApiParam({ name: "id", type: "number", description: "Prescription ID" })
  @UseGuards(DoctorsGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Prescription> {
    return this.prescriptionsService.findOne(+id);
  }

  @ApiOkResponse({
    description: "Prescription updated successfully.",
    type: Prescription,
  })
  @ApiNotFoundResponse({ description: "Prescription not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Prescription ID" })
  @UseGuards(DoctorsGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ): Promise<Prescription> {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @ApiOkResponse({ description: "Prescription deleted successfully." })
  @ApiNotFoundResponse({ description: "Prescription not found." })
  @UseGuards(DoctorsGuard)
  @ApiParam({ name: "id", type: "number", description: "Prescription ID" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.prescriptionsService.remove(+id);
    return;
  }
}
