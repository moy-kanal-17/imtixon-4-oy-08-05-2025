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
import { Doctor } from '../../doctors/models/doctors.models';
import { Patient } from '../../patient/models/patient.models';

@Table
export class MedicalRecord extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Doctor)
  @Column({ allowNull: false, type: DataType.INTEGER })
  doctor_id: number;

  @BelongsTo(() => Doctor, { foreignKey: 'doctor_id', as: 'doctor' })
  doctor: Doctor;

  @ApiProperty()
  @ForeignKey(() => Patient)
  @Column({ allowNull: false, type: DataType.INTEGER })
  patient_id: number;

  @BelongsTo(() => Patient, { foreignKey: 'patient_id', as: 'patient' })
  patient: Patient;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  result: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  notes: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  descriptions: string;
}
