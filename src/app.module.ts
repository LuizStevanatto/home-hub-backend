import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { User } from './domain/entities/user/user.entity';
import { AllExceptionsFilter } from './domain/exceptions/all-exceptions.filter';

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
        entities: [User],
        synchronize: true,
      }),
    }),
    UserModule,
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
