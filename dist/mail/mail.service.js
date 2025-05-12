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
dotenv.config();
let MailService = class MailService {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    async sendActivationLink({ email, token, name }) {
        const activationLink = `http://localhost:3001/auth/activate/${token}`;
        if (!email) {
            console.log("EMAIL YOQ!");
        }
        console.log(email, "🔥🔥 ");
        const subject = "🔐 Hisobingizni faollashtirish havolasi";
        const text = `
    Assalomu alaykum ${name}!
    
    Siz bizning tizimda ro‘yxatdan o‘tdingiz. Hisobingizni faollashtirish uchun quyidagi havolani bosing:
    
    👉 ${activationLink}
    
    Agar bu amalni siz bajarmagan bo‘lsangiz, bu xabarni e’tiborsiz qoldirishingiz mumkin.
    
    Hurmat bilan,  
    Bizning jamoamiz.
    `;
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text,
            });
        }
        catch (error) {
            console.error("Aktivatsiya havolasini yuborishda xatolik", error);
            throw new Error("Aktivatsiya havolasini yuborishda xatolik yuz berdi");
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map