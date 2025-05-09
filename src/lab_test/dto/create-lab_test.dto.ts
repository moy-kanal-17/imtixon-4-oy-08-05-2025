import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLabTestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patient_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  result: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descriptions: string;

  @ApiProperty()
  @IsNotEmpty()
  data: Date;
}
