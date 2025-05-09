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

@Table
export class Payment extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Patient)
  @Column({ allowNull: false, type: DataType.INTEGER, field: 'patient_id' })
  patient_id: number;

  @BelongsTo(() => Patient, { foreignKey: 'patient_id', as: 'patient' })
  patient: Patient;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  terminal: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.DATE })
  date: Date;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  method: string;
}
