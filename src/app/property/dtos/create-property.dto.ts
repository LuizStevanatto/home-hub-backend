import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nome da Propriedade', minLength: 4 })  
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Endereço da Propriedade', minLength: 4 })  
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Número da Propriedade', minLength: 1 })  
  number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Cidade da Propriedade', minLength: 4 })  
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Estado da Propriedade', minLength: 2 })  
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'País da Propriedade', minLength: 4 })  
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Código Postal da Propriedade', minLength: 5 })  
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Descrição da Propriedade', minLength: 10 })  
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Preço da Propriedade' })  
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Id do Proprietário' })  
  ownerId: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Disponibilidade da Propriedade', default: true })  
  isAvailable?: boolean;
}
