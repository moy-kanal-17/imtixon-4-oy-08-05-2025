import { Module } from "@nestjs/common";import { MailService } from "./mail.service";import { MailerModule } from "@nestjs-modules/mailer";import { ConfigService } from "@nestjs/config";import { join } from "path";import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("EMAIL_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("EMAIL_USER"),
            pass: config.get<string>("EMAIL_PASS"),
          },
          // tls: {
          //   rejectUnauthorized: false, // ⛔️ Sertifikatni tekshirmaydi
          // },
        },
        defaults: {
          from: `"Skidkachi" <${config.get<string>("ACTIVATION_BASE_URL")}`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          template: "confirmation",
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
