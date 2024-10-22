import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { UserNotFoundException } from 'src/domain/exceptions/user/user-not-found.exception';
import { UserException } from 'src/domain/exceptions/user/user.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async userAlreadyExists(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return !!user;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async findEmailAuth(email: string) {
    try {
      const data = await this.userRepository.findOneBy({ email });

      if (!data) throw new UserNotFoundException();
      return data;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const data = await this.userRepository.find({
        select: ['id', 'name', 'email', 'isAdmin'],
      });

      return data;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    const userExists = await this.userAlreadyExists(createUser.email);

    const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);

    const errorMessage = `${createUser.email} already exists`;

    if (userExists) throw new UserException(errorMessage);

    const data = {
      ...createUser,
      password: await bcrypt.hash(createUser.password, saltRounds),
    };

    const userCreated = await this.userRepository.save(data);

    return {
      ...userCreated,
      password: undefined,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    return {
      ...user,
      password: undefined,
    };
  }

  async updateUserById(userUpdate: UpdateUserDto, id): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    const data = {
      ...user,
      ...userUpdate,
    };

    data.email = user.email;
    data.password = user.password;

    try {
      await this.userRepository.save(data);
      return data;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async deleteUserById(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundException();

    try {
      await this.userRepository.delete(user);
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async getUserByEmail(email: string): Promise<User | void> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new UserNotFoundException();

    return {
      ...user,
      password: undefined,
    };
  }
}
