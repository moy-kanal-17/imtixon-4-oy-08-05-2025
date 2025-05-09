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
import { Patient } from 'src/patient/models/patient.models';
import { IsDateString } from 'class-validator';

@Table({ tableName: 'Lab_test' })
export class LabTest extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Patient)
  @Column({ allowNull: false, type: DataType.INTEGER, field: 'Patient_id' })
  patient_id: number;

  @BelongsTo(() => Patient, { foreignKey: 'Patient_id', as: 'patient' })
  patient: Patient;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  result: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  descriptions: string;

  @ApiProperty()
  @IsDateString()
  @Column({ allowNull: false, type: DataType.DATE })
  data: Date;
}
