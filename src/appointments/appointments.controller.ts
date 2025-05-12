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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(SelfOrStaffGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }
  @UseGuards(SelfOrStaffGuard)
  @Get("patients/:id")
  findPatient(@Param("id") id: string) {
    return this.appointmentsService.findPati(+id);
  }

  @UseGuards(SelfOrStaffGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @UseGuards(SelfOrStaffGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
