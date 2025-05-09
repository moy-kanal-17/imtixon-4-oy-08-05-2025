"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const doctors_models_1 = require("../doctors/models/doctors.models");
const staff_model_1 = require("../staffs/models/staff.model");
const patient_models_1 = require("../patient/models/patient.models");
const mail_service_1 = require("../mail/mail.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    mailService;
    patientModel;
    doctorModel;
    staffModel;
    jwtService;
    constructor(mailService, patientModel, doctorModel, staffModel, jwtService) {
        this.mailService = mailService;
        this.patientModel = patientModel;
        this.doctorModel = doctorModel;
        this.staffModel = staffModel;
        this.jwtService = jwtService;
    }
    async register(registerDto, role) {
        const { email, password, ...rest } = registerDto;
        let user;
        if (role === "patient") {
            user = await this.patientModel.findOne({ where: { email } });
        }
        else if (role === "doctor") {
            user = await this.doctorModel.findOne({ where: { email } });
        }
        else if (role === "staff" || role === "admin" || role === "creator") {
            user = await this.staffModel.findOne({ where: { email } });
        }
        else {
            throw new common_1.BadRequestException("Noto'g'ri rol kiritildi");
        }
        if (user) {
            throw new common_1.BadRequestException("Bu email allaqachon ro'yxatdan o'tgan");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === "patient") {
            return this.patientModel.create({
                email,
                password: hashedPassword,
                ...rest,
            });
        }
        else if (role === "doctor") {
            return this.doctorModel.create({
                email,
                password: hashedPassword,
                ...rest,
            });
        }
        else if (role === "staff" || role === "admin") {
            return this.staffModel.create({
                email,
                password: hashedPassword,
                ...rest,
                roles_id: registerDto.roles_id,
            });
        }
        else if (role === "creator") {
            return this.staffModel.create({
                email,
                password: hashedPassword,
                ...rest,
                roles_id: registerDto.roles_id,
            });
        }
        return null;
    }
    async login(email, password, role, res) {
        let user;
        if (role == "patient") {
            user = await this.patientModel.findOne({ where: { email } });
        }
        else if (role == "doctor") {
            user = await this.doctorModel.findOne({ where: { email } });
        }
        else if (role == "staff" || role == "admin" || role == "creator") {
            console.log(email);
            user = await this.staffModel.findOne({ where: { email } });
        }
        if (!user || !user.password) {
            console.log("rostaan??🤣😭");
            throw new common_1.UnauthorizedException("Noto'g'ri email yoki parol");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Noto'g'ri email yoki parol");
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
        console.log(`${user.email} 💀💀`);
        const token = (0, crypto_1.randomUUID)();
        await user.update({ activation_token: token });
        await this.mailService.sendActivationLink({ email: user.email, token });
        return { access_token };
    }
    async activateUser(token) {
        const user = await this.patientModel.findOne({
            where: { activation_token: token },
        });
        if (!user)
            throw new common_1.NotFoundException("Token noto‘g‘ri yoki foydalanuvchi topilmadi");
        user.is_active = true;
        user.activation_token = "null";
        await user.save();
        return { message: "Hisob muvaffaqiyatli faollashtirildi!" };
    }
    async refreshToken(refresh_token, res) {
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
            }
            else if (payload.role === "doctor") {
                console.log("doctor👎👎");
                user = await this.doctorModel.findByPk(payload.sub);
            }
            else if (payload.role === "staff" ||
                payload.role === "admin" ||
                payload.role === "creator") {
                console.log("creator 🥰👨‍💻👨‍💻");
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException("Yaroqsiz refresh token");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(patient_models_1.Patient)),
    __param(2, (0, sequelize_1.InjectModel)(doctors_models_1.Doctor)),
    __param(3, (0, sequelize_1.InjectModel)(staff_model_1.Staff)),
    __metadata("design:paramtypes", [mail_service_1.MailService, Object, Object, Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map