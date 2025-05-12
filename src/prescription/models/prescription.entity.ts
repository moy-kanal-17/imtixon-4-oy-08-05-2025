import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecord } from "../../medical-records/models/medical-record.entity";
import { Medication } from "../../medications/models/medication.entity";

@Table
export class Prescription extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => MedicalRecord)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "medical_records_id",
  })
  medical_records_id: number;

  @BelongsTo(() => MedicalRecord, {
    foreignKey: "medical_records_id",
    as: "medicalRecord",
  })
  medicalRecord: MedicalRecord;

  @ApiProperty()
  @ForeignKey(() => Medication)
  @Column({ allowNull: false, type: DataType.INTEGER, field: "medications_id" })
  medications_id: number;

  @BelongsTo(() => Medication, {
    foreignKey: "medications_id",
    as: "medication",
  })
  medication: Medication;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING })
  descriptions: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.STRING, field: "all_price" })
  allPrice: string;
}
