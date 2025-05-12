import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
  @ApiProperty({ required: true, example: "user@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: "password123" })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, example: "user" })
  @IsString()
  @IsNotEmpty()
  role: string;
}
