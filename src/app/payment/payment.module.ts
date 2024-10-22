import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/domain/entities/payment/payment.entity';
import { Contracts } from 'src/domain/entities/contracts/contracts.entity';
import { ContractsModule } from '../contracts/contracts.module';
import { ContractsService } from '../contracts/contracts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    TypeOrmModule.forFeature([Contracts]),
    ContractsModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ContractsService],
  exports: [PaymentService],
})
export class PaymentModule {}
