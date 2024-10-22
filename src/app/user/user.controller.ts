import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common/decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/endpoint-public.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/domain/entities/user/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('users') 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('signup')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.', type: User })
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUser);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: User })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUser);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obter usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso.', type: User })
  @ApiParam({ name: 'id', description: 'ID do usuário', required: true })
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.', type: [User] })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', required: true })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Body() userUpdate: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.userService.updateUserById(userUpdate, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Excluir usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', required: true })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }
}
