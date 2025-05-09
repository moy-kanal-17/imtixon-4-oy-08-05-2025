import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patient_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  result: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descriptions: string;
}
