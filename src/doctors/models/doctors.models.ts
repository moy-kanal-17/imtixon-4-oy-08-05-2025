import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from '../../specializations/models/specialization.models';

@Table
export class Doctor extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ApiProperty()
  @Column
  declare first_name: string;

  @ApiProperty()
  @Column
  declare last_name: string;

  @ApiProperty({ required: false })
  @ForeignKey(() => Specialization)
  @Column({ allowNull: true })
  declare specialization_id: number;

  @BelongsTo(() => Specialization, {
    foreignKey: "specialization_id",
    as: "specialization",
  })
  declare specialization: Specialization;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  declare hashed_token: string;

  @ApiProperty()
  @Column
  declare phone_number: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  declare birthday: Date;

  @ApiProperty({ default: true })
  @Column({ allowNull: true })
  declare active_link: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  declare gender: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  declare email: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true })
  declare password: string;

  @ApiProperty({ required: false })
  @Column({ defaultValue: false })
  declare is_active: boolean;
}
