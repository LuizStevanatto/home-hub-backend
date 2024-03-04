import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @IsOptional()
  @IsString()
  @IsUUID()
  ownerId: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
