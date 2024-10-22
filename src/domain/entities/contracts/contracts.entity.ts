import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contracts')
export class Contracts {
  @ApiProperty({ description: 'ID único do contrato', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'ID da propriedade associada ao contrato', example: '987e6543-e21b-54c3-a789-123456789000' })
  @Column()
  propertyId: string;

  @ApiProperty({ description: 'ID do inquilino associado ao contrato', example: '456e7890-f12b-34d5-c678-901234567890' })
  @Column()
  tentantId: string;

  @ApiProperty({ description: 'ID do proprietário associado ao contrato', example: '789e0123-d45f-67g8-h901-234567890abc' })
  @Column()
  ownerId: string;

  @ApiProperty({ description: 'Data de início do contrato', example: '2023-01-01' })
  @Column()
  startDate: Date;

  @ApiProperty({ description: 'Data de término do contrato', example: '2024-01-01' })
  @Column()
  endDate: Date;

  @ApiProperty({ description: 'Indica se o contrato está ativo', example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Valor do contrato', example: 1500 })
  @Column()
  price: number;

  @ApiProperty({ description: 'Data de criação do registro do contrato', example: '2023-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro do contrato', example: '2023-01-02T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
