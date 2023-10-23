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

interface AuthRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  login(@Req() request: AuthRequest) {
    return this.authService.login(request.body);
  }
}
