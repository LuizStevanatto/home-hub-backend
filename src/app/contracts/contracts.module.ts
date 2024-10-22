import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { PropertyModule } from '../property/property.module';
import { Property } from 'src/domain/entities/property/property.entity';
import { User } from 'src/domain/entities/user/user.entity';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { UserService } from '../user/user.service';
import { PropertyService } from '../property/property.service';
import { Contracts } from 'src/domain/entities/contracts/contracts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contracts]),
    TypeOrmModule.forFeature([Property]),
    TypeOrmModule.forFeature([User]),
    UserModule,
    PropertyModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService, UserService, PropertyService],
  exports: [ContractsService],
})
export class ContractsModule {}
