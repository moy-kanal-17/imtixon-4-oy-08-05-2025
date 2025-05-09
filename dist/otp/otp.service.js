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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const otp_model_1 = require("./models/otp.model");
const mails_service_1 = require("../mails/mails.service");
const sequelize_2 = require("sequelize");
let OtpService = class OtpService {
    otpRepository;
    mailService;
    constructor(otpRepository, mailService) {
        this.otpRepository = otpRepository;
        this.mailService = mailService;
    }
    async create(createOtpDto, userId) {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.otpRepository.create({
            userId: createOtpDto.userId,
            email: createOtpDto.email,
            otp: otpCode,
        });
        await this.mailService.sendOtp({ email: createOtpDto.email, code: otpCode });
        return { message: "OTP sent to email" };
    }
    async verify(email, code) {
        const otp = await this.otpRepository.findOne({
            where: {
                email,
                otp: code,
                createdAt: {
                    [sequelize_2.Op.gt]: new Date(Date.now() - 5 * 60 * 1000),
                },
            },
        });
        if (!otp)
            return { success: false, message: "Invalid or expired OTP" };
        return { success: true, message: "OTP verified" };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(otp_model_1.Otp)),
    __metadata("design:paramtypes", [Object, mails_service_1.MailService])
], OtpService);
//# sourceMappingURL=otp.service.js.map