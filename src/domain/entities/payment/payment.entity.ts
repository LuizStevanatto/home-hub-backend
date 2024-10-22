import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Payment {
  @ApiProperty({ description: 'ID único do pagamento', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'ID do contrato associado ao pagamento', example: '987e6543-e21b-54c3-a789-123456789000' })
  @Column()
  contractId: string;

  @ApiProperty({ description: 'Método de pagamento utilizado', example: 'Cartão de Crédito' })
  @Column()
  paymentMethod: string;

  @ApiProperty({ description: 'Valor do pagamento', example: 1500 })
  @Column()
  price: number;

  @ApiProperty({ description: 'Indica se o pagamento foi realizado', example: false })
  @Column({ default: false })
  isPaid: boolean;

  @ApiProperty({ description: 'Data de criação do registro do pagamento', example: '2023-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro do pagamento', example: '2023-01-02T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
