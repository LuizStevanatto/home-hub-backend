import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './exceptions/unauthorized.exception';
import { User } from 'src/domain/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface PayloadProp {
  name: string;
  email: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  isAdmin: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateEmailAndPassword(email: string, password: string) {
    const user = await this.userService.findEmailAuth(email);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError();
  }

  async login(user: any): Promise<LoginResponse> {
    const payload: PayloadProp = {
      name: user.name,
      email: user.email,
    };

    const userData = await this.userService.findEmailAuth(user.email);

    const jwt = this.jwtService.sign(payload);

    return {
      id: userData.id,
      name: userData.name,
      isAdmin: userData.isAdmin,
      email: user.email,
      accessToken: jwt,
    };
  }
}
