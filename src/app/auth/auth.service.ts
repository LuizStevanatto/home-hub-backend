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
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  login(user: any): LoginResponse {
    const payload: PayloadProp = {
      name: user.name,
      email: user.email,
    };

    const userData = this.userRepository.findOne({
      where: { email: user.email },
    });

    console.log(userData);

    const jwt = this.jwtService.sign(payload);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: jwt,
    };
  }
}
