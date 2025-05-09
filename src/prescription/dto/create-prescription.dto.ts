import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  medical_records_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  medications_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descriptions: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  allPrice: string;
}
