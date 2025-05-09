import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from 'src/doctors/models/doctors.models';
import { Staff } from 'src/staffs/models/staff.model';
import { Patient } from 'src/patient/models/patient.models';
import { JwtModule } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { StaffGuard } from '../common/guards/staffs.guard';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient, Doctor, Staff]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_SECRET || "super-secret",
        signOptions: { expiresIn: "15m" },
      }),
      global: true,
    }),
    MailModule,
  ],
  providers: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}