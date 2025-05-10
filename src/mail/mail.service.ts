import { Injectable } from "@nestjs/common";import * as nodemailer from "nodemailer";import * as dotenv from "dotenv";import { randomUUID } from "crypto";
dotenv.config();

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendActivationLink({ email, token ,name}: { email: string; token: string;name:string }) {
    const activationLink = `http://localhost:3001/auth/activate/${token}`;
    // console.log(process.env);
    

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
    } catch (error) {
      console.error("Aktivatsiya havolasini yuborishda xatolik", error);
      throw new Error("Aktivatsiya havolasini yuborishda xatolik yuz berdi");
    }
  }
}
