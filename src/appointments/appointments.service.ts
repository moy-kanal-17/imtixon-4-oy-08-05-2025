import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../patient/models/patient.models';
import { Doctor } from '../doctors/models/doctors.models';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private appointmentModel: typeof Appointment
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<Appointment> {
    console.log("YARATILDI APPOINTMENT!");
    return this.appointmentModel.create(
      createAppointmentDto as Partial<Appointment>
    );
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      include: [
        { model: Patient, as: "patient" },
        { model: Doctor, as: "doctor" },
      ],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByPk(id, {
      include: [
        { model: Patient, as: "patient" },
        { model: Doctor, as: "doctor" },
      ],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async findPati(doctorId: number): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      where: {doctor_id: doctorId },
      include: [
        { model: Patient, as: "patient" }
      ],
    });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    const [affectedCount] = await this.appointmentModel.update(
      updateAppointmentDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const updatedAppointment = await this.findOne(id);
    return updatedAppointment;
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await appointment.destroy();
  }
}
