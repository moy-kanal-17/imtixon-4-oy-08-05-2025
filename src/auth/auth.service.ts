import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Doctor } from "src/doctors/models/doctors.models";
import { Staff } from "src/staffs/models/staff.model";
import { Patient } from "src/patient/models/patient.models";
import { CreatePatientDto } from "src/patient/dto/create-patient.dto";
import { CreateDoctorDto } from "../doctors/dto/create-doctor.dto";
import { CreateStaffDto } from "../staffs/dto/create-staff.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { Response } from "express";
import { error } from "console";
import { MailService } from "src/mail/mail.service";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailService,
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    @InjectModel(Staff) private readonly staffModel: typeof Staff,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: CreatePatientDto, role: string) {
    const { email, password, ...rest } = registerDto as any;
    let user;
    console.log(registerDto);

    if (role === "patient") {
      const existing = await this.patientModel.findOne({ where: { email } });
      if (existing) {
        throw new BadRequestException("Bu email allaqachon ro'yxatdan o'tgan");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const token = randomUUID();
      const newUser = await this.patientModel.create({
        ...rest,
        email,
        password: hashedPassword,
        active_link: token,
      });

      await this.mailService.sendActivationLink({
        email: newUser.email,
        token,
        name: newUser.first_name || "foydalanuvchi",
      });

      return newUser;
    }
  }

  async login(
    email: string,
    password: string,
    role: "patient" | "doctor" | "staff" | "admin" | "creator",
    res: Response
  ): Promise<{ access_token: string }> {
    let user;

    if (role == "patient") {
      
      user = await this.patientModel.findOne({ where: { email } });
      if (!user.is_active) {
        const token = randomUUID();
        console.log("SIZ ACTIVE QILMAGANSIZ ACAUNTNI!");
        user.update({ active_link: token });
        await this.mailService.sendActivationLink({
          email: user.email,
          token: token,
          name: user.first_name || "foydalanuvchi",
        });
        throw new NotFoundException("SIZ ACTIVE QILMAGANSIZ ACAUNTNI!");
      }

    } else if (role == "doctor") {
      
      user = await this.doctorModel.findOne({ where: { email } });
    } else if (role == "staff" || role == "admin" || role == "creator") {
      console.log(email, password);

      user = await this.staffModel.findOne({ where: { email } });
    }

    if (!user || !user.password) {
      console.log("rostaan??🤣😭");

      throw new UnauthorizedException("Noto'g'ri email yoki parol");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Noto'g'ri email yoki parol");
    }

    const payload = { sub: user.id, email: user.email, role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || "super-secret",
      expiresIn: "15m",
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || "super-refresh-secret",
      expiresIn: "7d",
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    const hashedToken = await bcrypt.hash(refresh_token, 10);
    await user.update({ hashed_token: hashedToken });

    return { access_token };
  }

  async activateUser(token: string) {
    let user: Patient | Doctor | null = await this.patientModel.findOne({
      where: { active_link: token },
    });

    let userType = "patient";

    if (!user) {
      user = await this.doctorModel.findOne({
        where: { active_link: token },
      });
      userType = "doctor";
    }

    if (!user) {
      throw new NotFoundException(
        "Token noto‘g‘ri yoki foydalanuvchi topilmadi"
      );
    }

    user.is_active = true;
    user.active_link = "null";
    await user.save();

    return {
      message: "Hisob muvaffaqiyatli faollashtirildi!",
      type: userType,
    };
  }

  async refreshToken(
    refresh_token: string,
    res: Response
  ): Promise<{ access_token: string }> {
    try {
      console.log(process.env.EMAIL_PASS);
      console.log(process.env.EMAIL_USER);

      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET || "super-refresh-secret",
      });

      let user;
      if (payload.role === "patient") {
        console.log("patient👨‍💻👨‍💻");
        user = await this.patientModel.findByPk(payload.sub);
      } else if (payload.role === "doctor") {
        console.log("doctor👎👎");

        user = await this.doctorModel.findByPk(payload.sub);
      } else if (
        payload.role === "staff" ||
        payload.role === "admin" ||
        payload.role === "creator"
      ) {


        user = await this.staffModel.findByPk(payload.sub);
      }

      const new_payload = {
        sub: user.id,
        email: user.email,
        role: payload.role,
      };

      const new_access_token = await this.jwtService.signAsync(new_payload, {
        secret: process.env.JWT_ACCESS_SECRET || "super-secret",
        expiresIn: "15m",
      });

      const new_refresh_token = await this.jwtService.signAsync(new_payload, {
        secret: process.env.JWT_REFRESH_SECRET || "super-refresh-secret",
        expiresIn: "7d",
      });

      const hashedToken = await bcrypt.hash(new_refresh_token, 10);
      await user.update({ hashed_token: hashedToken });

      res.cookie("refresh_token", new_refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("access_token", new_access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return { access_token: new_access_token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Yaroqsiz refresh token");
    }
  }
}
