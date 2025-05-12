import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Prescription } from "src/prescription/models/prescription.entity";

@Table
export class Medication extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  descriptions: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @HasMany(() => Prescription, {
    foreignKey: "medications_id",
    as: "prescriptions",
  })
  prescriptions: Prescription[];
}
