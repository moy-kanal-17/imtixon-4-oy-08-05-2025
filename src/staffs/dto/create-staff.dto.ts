import { IsNotEmpty, IsString, IsPhoneNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  token_hashed: string;

  @ApiProperty()
  @IsNotEmpty()
  roles_id: number;
}
