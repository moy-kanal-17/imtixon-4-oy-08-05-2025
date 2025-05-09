import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
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
  active_link?: string;
}
