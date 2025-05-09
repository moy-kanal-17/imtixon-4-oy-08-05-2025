"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const doctors_module_1 = require("./doctors/doctors.module");
const doctors_models_1 = require("./doctors/models/doctors.models");
const specializations_module_1 = require("./specializations/specializations.module");
const specialization_models_1 = require("./specializations/models/specialization.models");
const role_module_1 = require("./role/role.module");
const staffs_module_1 = require("./staffs/staffs.module");
const patient_module_1 = require("./patient/patient.module");
const appointments_module_1 = require("./appointments/appointments.module");
const medical_records_module_1 = require("./medical-records/medical-records.module");
const lab_test_module_1 = require("./lab_test/lab_test.module");
const payments_module_1 = require("./payments/payments.module");
const medications_module_1 = require("./medications/medications.module");
const prescription_module_1 = require("./prescription/prescription.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const cookieParser = require("cookie-parser");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.PG_HOST,
                port: Number(process.env.PG_PORT),
                username: process.env.PG_USER,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DB,
                models: [doctors_models_1.Doctor, specialization_models_1.Specialization],
                autoLoadModels: true,
                sync: { alter: true },
                logging: false,
            }),
            doctors_module_1.DoctorsModule,
            specializations_module_1.SpecializationsModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            staffs_module_1.StaffsModule,
            patient_module_1.PatientModule,
            appointments_module_1.AppointmentsModule,
            medical_records_module_1.MedicalRecordsModule,
            lab_test_module_1.LabTestsModule,
            payments_module_1.PaymentsModule,
            prescription_module_1.PrescriptionsModule,
            medications_module_1.MedicationsModule,
            mail_module_1.MailModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map