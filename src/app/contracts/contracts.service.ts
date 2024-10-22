import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/domain/entities/property/property.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ContractsNotFoundException } from 'src/domain/exceptions/contracts/contracts-not-found.exception';
import { Contracts } from 'src/domain/entities/contracts/contracts.entity';
import { ContractsException } from 'src/domain/exceptions/contracts/contracts.exception';
import { CreateContractDto } from './dtos/create-contracts.dto';
import { UpdateContractDto } from './dtos/update-contracts.dto';
import { PropertyService } from '../property/property.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contracts)
    private readonly contractsRepository: Repository<Contracts>,
    private readonly userService: UserService,
    private readonly propertyService: PropertyService,
  ) {}

  async contractsAlreadyExists(
    propertyId: string,
    ownerId: string,
    tentantId: string,
    price: number,
  ) {
    try {
      const property = await this.contractsRepository.findOneBy({
        propertyId,
        ownerId,
        tentantId,
        price,
        isActive: true,
      });
      return !!property;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getAllContracts(): Promise<Contracts[]> {
    try {
      const data = await this.contractsRepository.find({});
      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getAllActiveContracts(): Promise<Contracts[]> {
    try {
      const data = await this.contractsRepository.find({
        where: {
          isActive: true,
        },
      });

      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getContractsById(id: string): Promise<Contracts> {
    try {
      const data = await this.contractsRepository.findOneBy({ id });

      if (!data) throw new ContractsNotFoundException();

      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getAllContractsByOwnerId(ownerId: string): Promise<Contracts[]> {
    try {
      const data = await this.contractsRepository.find({
        where: {
          ownerId,
        },
      });

      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getAllContractsByPropertyId(propertyId: string): Promise<Contracts[]> {
    try {
      const data = await this.contractsRepository.find({
        where: {
          propertyId,
        },
      });

      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async getAllContractsByTenantId(tentantId: string): Promise<Contracts[]> {
    try {
      const data = await this.contractsRepository.find({
        where: {
          tentantId,
        },
      });

      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async createContracts(
    createContracts: CreateContractDto,
  ): Promise<Contracts> {
    try {
      const ownerExists = await this.userService.getUserById(
        createContracts.ownerId,
      );

      if (!ownerExists) throw new ContractsException('Owner not found');

      const tentantUser = await this.userService.getUserByEmail(
        createContracts.tentantId,
      );

      if (!tentantUser) throw new ContractsException('Tentant not found');

      const propertyExists = await this.propertyService.getPropertyById(
        createContracts.propertyId,
      );

      if (!propertyExists) throw new ContractsException('Property not found');

      const contractsAlreadyExists = await this.contractsAlreadyExists(
        createContracts.propertyId,
        createContracts.ownerId,
        tentantUser.id,
        createContracts.price,
      );

      if (contractsAlreadyExists)
        throw new ContractsException('Contract already exists');

      const constractsCreated = await this.contractsRepository.save(
        createContracts,
      );

      const updateProperty = await this.propertyService.updatePropertyById(
        {
          isAvailable: false,
        },
        createContracts.propertyId,
      );

      return constractsCreated;
    } catch (err) {
      console.log(err);
      throw new ContractsException(err.message);
    }
  }

  async updateContractsById(
    contractsUpdate: UpdateContractDto,
    id,
  ): Promise<Contracts | null> {
    const contracts = await this.contractsRepository.findOneBy({ id });

    if (!contracts) throw new ContractsNotFoundException();

    const data = {
      ...contracts,
      ...contractsUpdate,
    };

    data.ownerId = contracts.ownerId;
    data.propertyId = contracts.propertyId;
    data.tentantId = contracts.tentantId;

    try {
      await this.contractsRepository.save(data);
      return data;
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }

  async deleteContractsById(id: string): Promise<void> {
    const contracts = await this.contractsRepository.findOneBy({ id });

    if (!contracts) throw new ContractsNotFoundException();

    try {
      await this.contractsRepository.update(id, { isActive: false });
    } catch (err) {
      throw new ContractsException(err.message);
    }
  }
}
