import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patient_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  terminal: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  method: string;
}
