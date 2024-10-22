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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Payments') 
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pagamento' })
  @ApiResponse({ status: 201, description: 'Pagamento criado com sucesso.', type: Payment })
  @ApiBody({ type: CreatePaymentDto })
  async createPayment(
    @Body() createPayment: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.createPayment(createPayment);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obter pagamento por ID' })
  @ApiResponse({ status: 200, description: 'Pagamento retornado com sucesso.', type: Payment })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', required: true })
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return await this.paymentService.getPaymentById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Obter todos os pagamentos' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos retornada com sucesso.', type: [Payment] })
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentService.getAllPayments();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar pagamento por ID' })
  @ApiResponse({ status: 200, description: 'Pagamento atualizado com sucesso.', type: Payment })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', required: true })
  @ApiBody({ type: UpdatePaymentDto })
  async updatePayment(
    @Body() paymentUpdate: UpdatePaymentDto,
    @Param('id') id: string,
  ): Promise<Payment> {
    return await this.paymentService.updatePaymentById(paymentUpdate, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Excluir pagamento por ID' })
  @ApiResponse({ status: 204, description: 'Pagamento excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do pagamento', required: true })
  async deletePayment(@Param('id') id: string): Promise<void> {
    await this.paymentService.deletePaymentById(id);
  }
}
