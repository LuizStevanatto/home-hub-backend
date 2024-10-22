import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Email do usuário' })  
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Email inválido',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nome do usuário' })  
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({ description: 'Senha do usuário', minLength: 4 })  
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indica se o usuário é um administrador', default: false })  
  isAdmin?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indica se o usuário está ativo', default: true })  
  isActive?: boolean;
}
