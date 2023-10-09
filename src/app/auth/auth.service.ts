import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './exceptions/unauthorized.exception';
import { User } from 'src/domain/entities/user/user.entity';

interface PayloadProp {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  accessToken: string;
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

  login(user: User): LoginResponse {
    const payload: PayloadProp = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: jwt,
    };
  }
}
