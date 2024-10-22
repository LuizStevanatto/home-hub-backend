import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('property')
export class Property {
  @ApiProperty({ description: 'ID único da propriedade', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome da propriedade', example: 'Apartamento no Centro' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Endereço da propriedade', example: 'Rua das Flores, 123' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Cidade onde a propriedade está localizada', example: 'São Paulo' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Estado onde a propriedade está localizada', example: 'SP' })
  @Column()
  state: string;

  @ApiProperty({ description: 'CEP da propriedade', example: '12345-678' })
  @Column()
  zipCode: string;

  @ApiProperty({ description: 'País onde a propriedade está localizada', example: 'Brasil' })
  @Column()
  country: string;

  @ApiProperty({ description: 'Descrição da propriedade', example: 'Apartamento amplo com 3 quartos e 2 banheiros' })
  @Column()
  description: string;

  @ApiProperty({ description: 'Preço da propriedade', example: 250000 })
  @Column()
  price: number;

  @ApiProperty({ description: 'Disponibilidade da propriedade', example: true })
  @Column({ default: true })
  isAvailable: boolean;

  @ApiProperty({ description: 'ID do proprietário da propriedade', example: '987e6543-e21b-54c3-a789-123456789000' })
  @Column()
  ownerId: string;

  @ApiProperty({ description: 'Data de criação do registro', example: '2023-01-01T00:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização do registro', example: '2023-01-01T00:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
