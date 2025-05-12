import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointments/models/appointment.model';

@Table
export class Patient extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  first_name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  last_name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  declare email: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  declare password: string;

  @ApiProperty()
  @Column({ allowNull: true, type: DataType.STRING })
  declare avatar: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: false, type: DataType.STRING })
  gender?: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  phone_number: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true, type: DataType.STRING })
  hashed_token?: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true, type: DataType.DATE })
  birthday?: Date;

  @ApiProperty({ default: false })
  @Column({ defaultValue: false, type: DataType.BOOLEAN })
  declare is_active: boolean;

  @ApiProperty({ required: false })
  @Column({  type: DataType.STRING })
  declare active_link?: string;

  @HasMany(() => Appointment, { foreignKey: "Patients_id", as: "appointments" })
  appointments: Appointment[];
}
