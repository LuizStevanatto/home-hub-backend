import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Identificador único do usuário' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email do usuário' }) 
  email: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Nome do usuário' }) 
  name: string;

  @Column({ name: 'password' })
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;

  @Column({ name: 'is_admin', default: false })
  @ApiProperty({ description: 'Indica se o usuário é administrador', default: false })
  isAdmin: boolean;

  @Column({ name: 'is_active', default: true })
  @ApiProperty({ description: 'Indica se o usuário está ativo', default: true })
  isActive: boolean;
}
