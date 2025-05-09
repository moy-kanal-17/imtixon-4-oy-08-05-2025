import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsService {
    private paymentModel;
    constructor(paymentModel: typeof Payment);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    remove(id: number): Promise<void>;
}
