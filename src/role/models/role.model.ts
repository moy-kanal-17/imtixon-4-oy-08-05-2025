import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from '../../staffs/models/staff.model';

@Table
export class Role extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ApiProperty()
  @Column
  name: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  descriptions: string;

  @HasMany(() => Staff, { foreignKey: 'roles_id', as: 'staffs' })
  staffs: Staff[];
}
