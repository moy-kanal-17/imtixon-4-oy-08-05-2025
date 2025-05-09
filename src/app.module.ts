import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from './doctors/models/doctors.models';
import { SpecializationsModule } from './specializations/specializations.module';
import { Specialization } from './specializations/models/specialization.models';
import { RoleModule } from './role/role.module';
import { StaffsModule } from './staffs/staffs.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { LabTestsModule } from './lab_test/lab_test.module';
import { PaymentsModule } from './payments/payments.module';
import { MedicationsModule } from './medications/medications.module';
import { PrescriptionsModule } from './prescription/prescription.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module'; 
// import { OtpModule } from './otp/otp.module';
import * as cookieParser from "cookie-parser";
import { SelfOrStaffGuard } from './common/guards/Self.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Doctor, Specialization],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DoctorsModule,
    SpecializationsModule,
    AuthModule,
    RoleModule,
    StaffsModule,
    PatientModule,
    AppointmentsModule,
    MedicalRecordsModule,
    LabTestsModule,
    PaymentsModule,
    PrescriptionsModule,
    MedicationsModule,
    MailModule,
    // OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*'); 
  }
}