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
import { Doctor } from '../../doctors/models/doctors.models';

@Table
export class Specialization extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ApiProperty()
  @Column({ allowNull: false })
  name: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: false })
  descriptions: string;

  @HasMany(() => Doctor, { foreignKey: "specialization_id", as: "doctors" })
  doctors: Doctor[];
}
