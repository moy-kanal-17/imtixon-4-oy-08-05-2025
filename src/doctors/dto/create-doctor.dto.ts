import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  specialization_id?: number;

  @ApiProperty()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  birthday?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  refresh_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  is_active?: boolean = true;
}
