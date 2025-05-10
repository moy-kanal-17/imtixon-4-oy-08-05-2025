export declare class MailService {
    private transporter;
    sendActivationLink({ email, token, name }: {
        email: string;
        token: string;
        name: string;
    }): Promise<void>;
}
