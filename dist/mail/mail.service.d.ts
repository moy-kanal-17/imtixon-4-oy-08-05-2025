export declare class MailService {
    private transporter;
    sendActivationLink({ email, token }: {
        email: string;
        token: string;
    }): Promise<void>;
}
