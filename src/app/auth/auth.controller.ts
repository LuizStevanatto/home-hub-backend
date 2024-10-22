import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from 'src/decorators/endpoint-public.decorator';
import { User } from 'src/domain/entities/user/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

interface AuthRequest extends Request {
  user: User;
}

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  @ApiOperation({ summary: 'Realizar login de um usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({ description: 'Dados de login do usuário', type: User })
  login(@Req() request: AuthRequest) {
    return this.authService.login(request.body);
  }
}
