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
import { SpecializationsService } from './specializations.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Specialization } from './models/specialization.models';
import { PatientGuard } from 'src/common/guards/patient.guard';
import { StaffGuard } from 'src/common/guards/staffs.guard';

@ApiTags("Specializations")
@Controller("specializations")
@UsePipes(new ValidationPipe())
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService
  ) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Specialization,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(StaffGuard)
  @Post()
  async create(
    @Body() createSpecializationDto: CreateSpecializationDto
  ): Promise<Specialization> {
    return this.specializationsService.create(createSpecializationDto);
  }

  @ApiOkResponse({
    description: "List of all specializations.",
    type: [Specialization],
  })
  @UseGuards(StaffGuard)
  @Get()
  async findAll(): Promise<Specialization[]> {
    return this.specializationsService.findAll();
  }

  @ApiOkResponse({ description: "Specialization found.", type: Specialization })
  @ApiNotFoundResponse({ description: "Specialization not found." })
  @ApiParam({ name: "id", type: "number", description: "Specialization ID" })
  @UseGuards(StaffGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Specialization> {
    return this.specializationsService.findOne(+id);
  }

  // @UseGuards(PatientGuard)
  // @Get('spe/:id')
  // async findbyspec(@Param('id') id:string): Promise<Specialization>{
  //   return this.specializationsService.findByspe(+id)
  // }

  @ApiOkResponse({
    description: "Specialization updated successfully.",
    type: Specialization,
  })
  @ApiNotFoundResponse({ description: "Specialization not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Specialization ID" })
  @UseGuards(StaffGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto
  ): Promise<Specialization> {
    return this.specializationsService.update(+id, updateSpecializationDto);
  }

  @ApiOkResponse({ description: "Specialization deleted successfully." })
  @ApiNotFoundResponse({ description: "Specialization not found." })
  @ApiParam({ name: "id", type: "number", description: "Specialization ID" })
  @UseGuards(StaffGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.specializationsService.remove(+id);
    return;
  }
}
