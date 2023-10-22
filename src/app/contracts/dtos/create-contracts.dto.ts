import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  isNotEmpty,
} from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  propertyId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tentantId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  ownerId: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
