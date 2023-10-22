import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common/decorators';
import { IsPublic } from 'src/decorators/endpoint-public.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/domain/entities/user/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('signup')
  async singUp(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUser);
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUser);
  }

  @Get('/:id')
  async getUserById(@Body('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  async updateUser(
    @Body() userUpdate: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.userService.updateUserById(userUpdate, id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }
}
