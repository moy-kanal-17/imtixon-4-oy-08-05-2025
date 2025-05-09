import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<void>;
}
