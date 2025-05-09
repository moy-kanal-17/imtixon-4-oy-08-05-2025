"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const sequelize_1 = require("@nestjs/sequelize");
const doctors_models_1 = require("../doctors/models/doctors.models");
const staff_model_1 = require("../staffs/models/staff.model");
const patient_models_1 = require("../patient/models/patient.models");
const jwt_1 = require("@nestjs/jwt");
const cookieParser = require("cookie-parser");
const mail_module_1 = require("../mail/mail.module");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes("*");
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([patient_models_1.Patient, doctors_models_1.Doctor, staff_model_1.Staff]),
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_ACCESS_SECRET || "super-secret",
                    signOptions: { expiresIn: "15m" },
                }),
                global: true,
            }),
            mail_module_1.MailModule,
        ],
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map