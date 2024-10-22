import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { User } from './domain/entities/user/user.entity';
import { AllExceptionsFilter } from './domain/exceptions/all-exceptions.filter';
import { PropertyModule } from './app/property/property.module';
import { Property } from './domain/entities/property/property.entity';
import { ContractsModule } from './app/contracts/contracts.module';
import { Contracts } from './domain/entities/contracts/contracts.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.TYPE_ORM_DB as any,
        host: process.env.TYPE_ORM_DB_HOST,
        port: Number(process.env.TYPE_ORM_DB_PORT),
        username: process.env.TYPE_ORM_DB_USERNAME,
        password: process.env.TYPE_ORM_DB_PASSWORD,
        database: process.env.TYPE_ORM_DB_DATABASE,
        entities: [User, Property, Contracts],
        synchronize: true,
      }),
    }),
    UserModule,
    PropertyModule,
    ContractsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
