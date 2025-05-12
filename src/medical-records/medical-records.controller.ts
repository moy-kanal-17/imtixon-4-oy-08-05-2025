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
} from "@nestjs/common";
import { MedicalRecordsService } from "./medical-records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from "@nestjs/swagger";
import { MedicalRecord } from "./models/medical-record.entity";
import { DoctorsGuard } from "src/common/guards/doctors.guard";
import { SelfOrStaffGuard } from "src/common/guards/Self.guard";

@ApiTags("Medical Records")
@Controller("medical-records")
@UsePipes(new ValidationPipe())
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: MedicalRecord,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(DoctorsGuard)
  @Post()
  async create(
    @Body() createMedicalRecordDto: CreateMedicalRecordDto
  ): Promise<MedicalRecord> {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @ApiOkResponse({
    description: "List of all medical records.",
    type: [MedicalRecord],
  })
  @UseGuards(DoctorsGuard)
  @Get()
  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordsService.findAll();
  }

  @UseGuards(SelfOrStaffGuard)
  @ApiOkResponse({ description: "Medical record found.", type: MedicalRecord })
  @ApiNotFoundResponse({ description: "Medical record not found." })
  @ApiParam({ name: "id", type: "number", description: "Medical record ID" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<MedicalRecord> {
    return this.medicalRecordsService.findOne(+id);
  }

  @ApiOkResponse({
    description: "Medical record updated successfully.",
    type: MedicalRecord,
  })
  @UseGuards(DoctorsGuard)
  @ApiNotFoundResponse({ description: "Medical record not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Medical record ID" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ): Promise<MedicalRecord> {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @UseGuards(DoctorsGuard)
  @ApiOkResponse({ description: "Medical record deleted successfully." })
  @ApiNotFoundResponse({ description: "Medical record not found." })
  @ApiParam({ name: "id", type: "number", description: "Medical record ID" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.medicalRecordsService.remove(+id);
    return;
  }
}
