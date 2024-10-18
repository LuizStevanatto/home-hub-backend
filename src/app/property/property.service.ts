import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { Property } from 'src/domain/entities/property/property.entity';
import { PropertyException } from 'src/domain/exceptions/property/property.exception';
import { PropertyNotFoundException } from 'src/domain/exceptions/property/property-not-found.exception';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PropertyService {
  contractsRepository: any;
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly userService: UserService,
  ) {}

  async propertyAlreadyExists(name: string, ownerId: string) {
    try {
      const property = await this.propertyRepository.findOneBy({
        name,
        ownerId,
      });
      return !!property;
    } catch (err) {
      throw new PropertyException(err.message);
    }
  }

  async getAllProperties(): Promise<Property[]> {
    try {
      const data = await this.propertyRepository.find({});

      return data;
    } catch (err) {
      throw new PropertyException(err.message);
    }
  }

  async createProperty(createProperty: CreatePropertyDto): Promise<Property> {
    const propertyExists = await this.propertyAlreadyExists(
      createProperty.name,
      createProperty.ownerId,
    );

    const userExists = await this.userService.getUserById(
      createProperty.ownerId,
    );

    if (!userExists) throw new PropertyException('User not found');

    const errorMessage = `${createProperty.name} already exists`;

    if (propertyExists) throw new PropertyException(errorMessage);

    const propertyCreated = await this.propertyRepository.save(createProperty);

    return propertyCreated;
  }

  async getPropertyById(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) throw new PropertyNotFoundException();

    return property;
  }

  async updatePropertyById(
    propertyUpdate: UpdatePropertyDto,
    id,
  ): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) throw new PropertyNotFoundException();

    const data = {
      ...property,
      ...propertyUpdate,
    };

    data.ownerId = property.ownerId;

    try {
      await this.propertyRepository.save(data);
      return data;
    } catch (err) {
      throw new PropertyException(err.message);
    }
  }

  async deletePropertyById(id: string): Promise<void> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) throw new PropertyNotFoundException();

    try {
      var contracts = await this.contractsRepository.find({
        where: {
          propertyId: id,
        },
      });

      // VERRTIFAR SE TEM CONTRATOATVO
      contracts.map((contract) => {
        if (contract.isActive) {
          throw new PropertyException('Property has active contracts');
        }
      });

      await this.propertyRepository.delete(property.id);
    } catch (err) {
      throw new PropertyException(err.message);
    }
  }
}
