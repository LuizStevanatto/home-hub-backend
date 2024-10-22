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
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { Property } from 'src/domain/entities/property/property.entity';
import { CreatePropertyDto } from './dtos/create-property.dto';


@ApiTags('property') 
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova propriedade' })
  @ApiResponse({ status: 201, description: 'Propriedade criada com sucesso.', type: Property })
  @ApiBody({ type: CreatePropertyDto })
  async createProperty(
    @Body() createProperty: CreatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.createProperty(createProperty);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Obter propriedade por ID' })
  @ApiResponse({ status: 200, description: 'Propriedade retornada com sucesso.', type: Property })
  @ApiParam({ name: 'id', description: 'ID da propriedade', required: true })
  async getPropertyById(@Param('id') id: string): Promise<Property> {
    return await this.propertyService.getPropertyById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Obter todas as propriedades' })
  @ApiResponse({ status: 200, description: 'Lista de propriedades retornada com sucesso.', type: [Property] })
  async getAllProperties(): Promise<Property[]> {
    return await this.propertyService.getAllProperties();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar propriedade por ID' })
  @ApiResponse({ status: 200, description: 'Propriedade atualizada com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID da propriedade', required: true })
  @ApiBody({ type: UpdatePropertyDto })
  async updateProperty(
    @Body() propertyUpdate: UpdatePropertyDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.propertyService.updatePropertyById(propertyUpdate, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Excluir propriedade por ID' })
  @ApiResponse({ status: 200, description: 'Propriedade excluída com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID da propriedade', required: true })
  async deleteProperty(@Param('id') id: string): Promise<void> {
    await this.propertyService.deletePropertyById(id);
  }
}
