import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  declare first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  declare last_name: string;

  @ApiProperty({example:"email patient",description:"patientni emaili"})
  @IsEmail()
  declare email: string;
  

  @ApiProperty()
  @IsOptional()
  @IsString()
  declare password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  declare hashed_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  declare active_link?: string;

  avatar:string
}
