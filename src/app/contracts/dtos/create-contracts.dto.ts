import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'ID da Propriedade', minLength: 4 })  
  propertyId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'ID do Inquilino' })  
  tentantId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'ID do Proprietário', required: false })  
  ownerId?: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Data de Início do Contrato' })  
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Data de Fim do Contrato' }) 

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Indica se o contrato está ativo' }) 
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Preço do Contrato' }) 
  price: number;
}
