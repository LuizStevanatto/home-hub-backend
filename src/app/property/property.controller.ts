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
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { Property } from 'src/domain/entities/property/property.entity';
import { CreatePropertyDto } from './dtos/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async createProperty(
    @Body() createProperty: CreatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.createProperty(createProperty);
  }

  @Get('/:id')
  async getPropertyById(@Param('id') id: string): Promise<Property> {
    return await this.propertyService.getPropertyById(id);
  }

  @Get('/')
  async getAllProperties(): Promise<Property[]> {
    return await this.propertyService.getAllProperties();
  }

  @Put('/:id')
  async updateProperty(
    @Body() propertyUpdate: UpdatePropertyDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.propertyService.updatePropertyById(propertyUpdate, id);
  }

  @Delete('/:id')
  async deleteProperty(@Param('id') id: string): Promise<void> {
    await this.propertyService.deletePropertyById(id);
  }
}
