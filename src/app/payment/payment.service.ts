import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/domain/entities/payment/payment.entity';
import { Repository } from 'typeorm';
import { ContractsService } from '../contracts/contracts.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdateContractDto } from '../contracts/dtos/update-contracts.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly contractsService: ContractsService,
  ) {}

  async paymentAlreadyExists(contractId: string) {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { contractId },
      });

      return !!payment;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllPayments(): Promise<Payment[]> {
    try {
      const data = await this.paymentRepository.find({});

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getPaymentById(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOneBy({ id });

      if (!payment) throw new Error('Payment not found');

      return payment;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getPaymentByContractId(contractId: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOneBy({ contractId });

      if (!payment) throw new Error('Payment not found');

      return payment;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createPayment(payment: CreatePaymentDto): Promise<Payment> {
    const contract = await this.contractsService.getContractsById(
      payment.contractId,
    );

    if (!contract) throw new Error('Contract not found');

    const paymentCreated = await this.paymentRepository.save(payment);

    return paymentCreated;
  }

  async updatePaymentById(
    paymentUpdate: UpdateContractDto,
    id,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) throw new Error('Payment not found');

    const data = {
      ...payment,
      ...paymentUpdate,
    };

    data.contractId = payment.contractId;

    try {
      await this.paymentRepository.save(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletePaymentById(id: string): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) throw new Error('Payment not found');

    try {
      await this.paymentRepository.delete(payment.id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletePaymentByContractId(contractId: string): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({ contractId });

    if (!payment) throw new Error('Payment not found');

    try {
      await this.paymentRepository.delete(payment.id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async concludePayment(contractId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ contractId });

    if (!payment) throw new Error('Payment not found');

    payment.isPaid = true;

    try {
      await this.paymentRepository.save(payment);
      return payment;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
