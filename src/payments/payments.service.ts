import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Patient } from 'src/patient/models/patient.models';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentModel.create(createPaymentDto as Partial<Payment>);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, {
      include: [{ model: Patient, as: 'patient' }],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const [affectedCount] = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    const updatedPayment = await this.findOne(id);
    return updatedPayment;
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await payment.destroy();
  }
}
