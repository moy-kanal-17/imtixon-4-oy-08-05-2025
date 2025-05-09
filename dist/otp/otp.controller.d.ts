import { CreateOtpDto } from "./dto/create-otp.dto";
import { OtpService } from "./otp.service";
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    create(createOtpDto: CreateOtpDto): Promise<{
        message: string;
    }>;
    verify(body: {
        email: string;
        code: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
