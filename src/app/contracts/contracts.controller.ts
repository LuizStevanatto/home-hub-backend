import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { Contracts } from 'src/domain/entities/contracts/contracts.entity';
import { UpdateContractDto } from './dtos/update-contracts.dto';

@ApiTags('contracts') 
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('')
  @ApiOperation({ summary: 'Obter todas as contratos' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso.', type: [Contracts] })
  async getAllContracts(): Promise<Contracts[]> {
    return await this.contractsService.getAllContracts();
  }

  @Get('/active')
  @ApiOperation({ summary: 'Obter todas as contratos ativas' })
  @ApiResponse({ status: 200, description: 'Lista de contratos ativas retornada com sucesso.', type: [Contracts] })
  async getAllActiveContracts(): Promise<Contracts[]> {
    return await this.contractsService.getAllActiveContracts();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obter contrato por ID' })
  @ApiResponse({ status: 200, description: 'Contrato retornado com sucesso.', type: Contracts })
  @ApiParam({ name: 'id', description: 'ID do contrato', required: true })
  async getContractsById(@Param('id') id: string): Promise<Contracts> {
    return await this.contractsService.getContractsById(id);
  }

  @Get('/owner/:id')
  @ApiOperation({ summary: 'Obter contratos pelo ID do proprietário' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso.', type: [Contracts] })
  @ApiParam({ name: 'id', description: 'ID do proprietário', required: true })
  async getAllContractsByOwnerId(
    @Param('id') id: string,
  ): Promise<Contracts[]> {
    return await this.contractsService.getAllContractsByOwnerId(id);
  }

  @Get('/property/:id')
  @ApiOperation({ summary: 'Obter contratos pelo ID da propriedade' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso.', type: [Contracts] })
  @ApiParam({ name: 'id', description: 'ID da propriedade', required: true })
  async getAllContractsByPropertyId(
    @Param('id') id: string,
  ): Promise<Contracts[]> {
    return await this.contractsService.getAllContractsByPropertyId(id);
  }

  @Get('/tenant/:id')
  @ApiOperation({ summary: 'Obter contratos pelo ID do inquilino' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso.', type: [Contracts] })
  @ApiParam({ name: 'id', description: 'ID do inquilino', required: true })
  async getAllContractsByTenantId(
    @Param('id') id: string,
  ): Promise<Contracts[]> {
    return await this.contractsService.getAllContractsByTenantId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo contrato' })
  @ApiResponse({ status: 201, description: 'Contrato criado com sucesso.', type: Contracts })
  @ApiBody({ type: CreateContractDto })
  async createContracts(
    @Body() createContracts: CreateContractDto,
  ): Promise<Contracts> {
    return await this.contractsService.createContracts(createContracts);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar contrato por ID' })
  @ApiResponse({ status: 200, description: 'Contrato atualizado com sucesso.', type: Contracts })
  @ApiParam({ name: 'id', description: 'ID do contrato', required: true })
  @ApiBody({ type: UpdateContractDto })
  async updateContractsById(
    @Param('id') id: string,
    @Body() updateContracts: UpdateContractDto,
  ): Promise<Contracts> {
    return await this.contractsService.updateContractsById(updateContracts, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Excluir contrato por ID' })
  @ApiResponse({ status: 200, description: 'Contrato excluído com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do contrato', required: true })
  async deleteContracts(@Param('id') id: string): Promise<void> {
    await this.contractsService.deleteContractsById(id);
  }
}
