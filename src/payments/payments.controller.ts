import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
import { StaffGuard } from 'src/common/guards/staffs.guard';
import { SelfOrStaffGuard } from 'src/common/guards/Self.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { PatientGuard } from 'src/common/guards/patient.guard';

@ApiTags("Payments")
@Controller("payments")
@UsePipes(new ValidationPipe())
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Payment,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @UseGuards(PatientGuard)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(StaffGuard)
  @ApiOkResponse({ description: "List of all payments.", type: [Payment] })
  @UseGuards(AdminGuard)
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @ApiOkResponse({ description: "Payment found.", type: Payment })
  @ApiNotFoundResponse({ description: "Payment not found." })
  @ApiParam({ name: "id", type: "number", description: "Payment ID" })
  @UseGuards(SelfOrStaffGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Payment> {
    return this.paymentsService.findOne(+id);
  }

  @ApiOkResponse({
    description: "Payment updated successfully.",
    type: Payment,
  })
  @ApiNotFoundResponse({ description: "Payment not found." })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  @ApiParam({ name: "id", type: "number", description: "Payment ID" })
  @UseGuards(SelfOrStaffGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    return this.paymentsService.update(+id, updatePaymentDto);
  }
  @UseGuards(SelfOrStaffGuard)
  @ApiOkResponse({ description: "Payment deleted successfully." })
  @ApiNotFoundResponse({ description: "Payment not found." })
  @ApiParam({ name: "id", type: "number", description: "Payment ID" })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    await this.paymentsService.remove(+id);
    return;
  }
}
