import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { Contracts } from 'src/domain/entities/contracts/contracts.entity';
import { UpdateContractDto } from './dtos/update-contracts.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('')
  async getAllContracts(): Promise<Contracts[]> {
    return await this.contractsService.getAllContracts();
  }

  @Get('/active')
  async getAllActiveContracts(): Promise<Contracts[]> {
    return await this.contractsService.getAllActiveContracts();
  }

  @Get('/:id')
  async getContractsById(@Param('id') id: string): Promise<Contracts> {
    return await this.contractsService.getContractsById(id);
  }

  @Post()
  async createContracts(
    @Body() createContracts: CreateContractDto,
  ): Promise<Contracts> {
    return await this.contractsService.createContracts(createContracts);
  }

  @Put('/:id')
  async updateContractsById(
    @Param('id') id: string,
    @Body() updateContracts: UpdateContractDto,
  ): Promise<Contracts> {
    return await this.contractsService.updateContractsById(updateContracts, id);
  }

  @Delete('/:id')
  async deleteContracts(@Param('id') id: string): Promise<void> {
    await this.contractsService.deleteContractsById(id);
  }
}
