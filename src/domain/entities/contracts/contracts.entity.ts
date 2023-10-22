import { type } from 'os';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contracts')
export class Contracts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  propertyId: string;

  @Column()
  tentantId: string;

  @Column()
  ownerId: string;

  @Column((type) => Date)
  startDate: string;

  @Column((type) => Date)
  endDate: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
