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
import { RolesService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from './models/role.model';
import { StaffGuard } from 'src/common/guards/staffs.guard';

@ApiTags("Roles")
@Controller("roles")
@UsePipes(new ValidationPipe())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Role,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  // @UseGuards(StaffGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOkResponse({ description: "List of all roles.", type: [Role] })
  @UseGuards(StaffGuard)
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @ApiOkResponse({ description: "Role found.", type: Role })
  @ApiNotFoundResponse({ description: "Role not found." })
  @ApiParam({ name: "id", type: "number", description: "Role ID" })
  @UseGuards(StaffGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @ApiOkResponse({ description: "Role updated successfully.", type: Role })
  @ApiNotFoundResponse({ description: "Role not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Role ID" })
  @UseGuards(StaffGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOkResponse({ description: "Role deleted successfully." })
  @ApiNotFoundResponse({ description: "Role not found." })
  @ApiParam({ name: "id", type: "number", description: "Role ID" })
  @UseGuards(StaffGuard)
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.rolesService.remove(+id);
    return;
  }
}
