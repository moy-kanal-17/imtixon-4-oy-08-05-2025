export declare class MailService {
    private transporter;
    sendMail(to: string, subject: string, html: string): Promise<any>;
    sendActivationLink(email: string, userId: string): Promise<string>;
}
