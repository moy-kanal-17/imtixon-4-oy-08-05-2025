import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { CreatePatientDto } from "src/patient/dto/create-patient.dto";
import { CreateDoctorDto } from "src/doctors/dto/create-doctor.dto";
import { CreateStaffDto } from "src/staffs/dto/create-staff.dto";
import { ApiBody, ApiParam } from "@nestjs/swagger";
import { LoginAuthDto } from "./dto/login-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: CreatePatientDto) {
    const { role } = body as any;

    if (!role) {
      throw new BadRequestException("Role kiritilishi kerak");
    }

    return this.authService.register(body, role);
  }

  @Post("login")
  @ApiBody({ type: LoginAuthDto })
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      throw new UnauthorizedException(
        "Email, password va role talab qilinadi."
      );
    }
    return this.authService.login(email, password, role, res);
  }

  @Get("activate/:token")
  async activate(@Param("token") token: string) {
    return this.authService.activateUser(token);
  }

  @Post("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ access_token: string }> {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }
    return this.authService.refreshToken(refresh_token, res);
  }
}
