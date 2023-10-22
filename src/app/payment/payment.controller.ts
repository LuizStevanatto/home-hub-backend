import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { Payment } from 'src/domain/entities/payment/payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() createPayment: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.createPayment(createPayment);
  }

  @Get('/:id')
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return await this.paymentService.getPaymentById(id);
  }

  @Get('/')
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentService.getAllPayments();
  }

  @Put('/:id')
  async updatePayment(
    @Body() paymentUpdate: UpdatePaymentDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.paymentService.updatePaymentById(paymentUpdate, id);
  }

  @Delete('/:id')
  async deletePayment(@Param('id') id: string): Promise<void> {
    await this.paymentService.deletePaymentById(id);
  }
}
