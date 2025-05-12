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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from "@nestjs/swagger";
import { LabTestsService } from "./lab_test.service";
import { LabTest } from "./models/lab_test.entity";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import { SelfOrStaffGuard } from "src/common/guards/Self.guard";
import { AdminGuard } from "src/common/guards/admin.guard";
import { DoctorsGuard } from "src/common/guards/doctors.guard";

@ApiTags("Lab Tests")
@Controller("lab-tests")
@UsePipes(new ValidationPipe())
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: LabTest,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(DoctorsGuard)
  @Post()
  async create(@Body() createLabTestDto: CreateLabTestDto): Promise<LabTest> {
    return this.labTestsService.create(createLabTestDto);
  }

  @UseGuards(DoctorsGuard)
  @ApiOkResponse({ description: "List of all lab tests.", type: [LabTest] })
  @Get()
  async findAll(): Promise<LabTest[]> {
    return this.labTestsService.findAll();
  }

  @UseGuards(DoctorsGuard)
  @Get("/spe/:id")
  findByspec(@Param("id") id: string) {
    return this.labTestsService.findByspec(+id);
  }

  @UseGuards(DoctorsGuard)
  @ApiOkResponse({ description: "Lab test found.", type: LabTest })
  @ApiNotFoundResponse({ description: "Lab test not found." })
  @ApiParam({ name: "id", type: "number", description: "Lab test ID" })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<LabTest> {
    return this.labTestsService.findOne(+id);
  }

  @ApiOkResponse({
    description: "Lab test updated successfully.",
    type: LabTest,
  })
  @UseGuards(SelfOrStaffGuard)
  @ApiNotFoundResponse({ description: "Lab test not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Lab test ID" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateLabTestDto: UpdateLabTestDto
  ): Promise<LabTest> {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @UseGuards(DoctorsGuard)
  @ApiOkResponse({ description: "Lab test deleted successfully." })
  @ApiNotFoundResponse({ description: "Lab test not found." })
  @ApiParam({ name: "id", type: "number", description: "Lab test ID" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.labTestsService.remove(+id);
    return;
  }
}
