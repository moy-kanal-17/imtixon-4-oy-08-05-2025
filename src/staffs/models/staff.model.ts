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
import { Role } from '../../role/models/role.model';

@Table
export class Staff extends Model {
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
  @Column({ allowNull: false, type: DataType.STRING })
  phone_number: string;

  @ApiProperty({ required: false })
  @Column({ allowNull: true, type: DataType.STRING })
  hashed_token: string;

  @ApiProperty()
  @Column({ allowNull: true, type: DataType.STRING })
  activation_token: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue:false})
  IsCreator?: boolean = false;

  @ApiProperty()
  @ForeignKey(() => Role)
  @Column({ allowNull: false, type: DataType.INTEGER })
  roles_id: number;

  @BelongsTo(() => Role, { foreignKey: "roles_id", as: "role" })
  role: Role;
}
