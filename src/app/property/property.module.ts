import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/domain/entities/property/property.entity';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from 'src/domain/entities/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService, UserService],
  exports: [PropertyService],
})
export class PropertyModule {}
