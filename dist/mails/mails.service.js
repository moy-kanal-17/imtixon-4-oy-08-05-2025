"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const uuid_1 = require("uuid");
dotenv.config();
let MailService = class MailService {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    async sendMail(to, subject, html) {
        return this.transporter.sendMail({
            from: `"My App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    }
    async sendActivationLink(email, userId) {
        const token = (0, uuid_1.v4)();
        const activationUrl = `${process.env.ACTIVATION_BASE_URL}/activate?token=${token}&userId=${userId}`;
        const subject = "Hisobingizni faollashtiring";
        const html = `
      <h2>Hisobingizni faollashtirish uchun quyidagi havolani bosing:</h2>
      <a href="${activationUrl}" target="_blank">${activationUrl}</a>
      <p>Agar bu siz bo‘lmasangiz, iltimos bu xatni e'tiborsiz qoldiring.</p>
    `;
        await this.sendMail(email, subject, html);
        return token;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mails.service.js.map