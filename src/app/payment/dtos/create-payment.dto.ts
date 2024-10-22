import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Número do Contrato', minLength: 4 }) 
  contractId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Forma de Pagamento', minLength: 4 }) 
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Valor da Transação' }) 
  price: number;
}
