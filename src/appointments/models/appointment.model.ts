// src/appointments/entities/appointment.entity.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/models/patient.models';
import { Doctor } from '../../doctors/models/doctors.models';

@Table
export class Appointment extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Patient)
  @Column({ allowNull: false, type: DataType.INTEGER })
  Patients_id: number;

  @BelongsTo(() => Patient, { foreignKey: 'Patients_id', as: 'patient' })
  patient: Patient;

  @ApiProperty()
  @ForeignKey(() => Doctor)
  @Column({ allowNull: false, type: DataType.INTEGER })
  doctor_id: number;

  @BelongsTo(() => Doctor, { foreignKey: 'doctor_id', as: 'doctor' })
  doctor: Doctor;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.DATE })
  date: Date;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  status: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  adress: string;
}
