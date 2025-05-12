import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';import { StaffsService } from './staffs.service';import { CreateStaffDto } from './dto/create-staff.dto';import { UpdateStaffDto } from './dto/update-staff.dto';import { AdminGuard } from 'src/common/guards/admin.guard';import { StaffGuard } from 'src/common/guards/staffs.guard';import { CreatorGuard } from 'src/common/guards/Crreator.guard';@Controller("staffs")
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @UseGuards(AdminGuard)
  @Post("/staff")
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @UseGuards(CreatorGuard)
  @Post("/admin")
  createAdmin(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.createAdmin(createStaffDto);
  }
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get("by/:id")
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Get("/spe/:id")
  findByspec(@Param("id") id: string) {
    return this.staffsService.findByspec(+id);
  }

  @UseGuards(CreatorGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @UseGuards(CreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }
}
