import { Otp } from "./models/otp.model";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { MailService } from "src/mails/mails.service";
export declare class OtpService {
    private otpRepository;
    private readonly mailService;
    constructor(otpRepository: typeof Otp, mailService: MailService);
    create(createOtpDto: CreateOtpDto, userId: any): Promise<{
        message: string;
    }>;
    verify(email: string, code: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
