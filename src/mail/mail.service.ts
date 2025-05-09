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

  async sendActivationLink({ email, token }: { email: string; token: string }) {
    const activationLink = `http://localhost:3001/auth/activate/${token}`;
    // console.log(process.env);
    

    const subject = "Hisobingizni faollashtiring";
    const text = `Iltimos, hisobingizni faollashtirish uchun quyidagi havolani bosing:\n\n${activationLink}`;

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
