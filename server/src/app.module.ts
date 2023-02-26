import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
//import { UploadController } from './upload/upload.controller'
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from './users/entities/user.entity';
import { UploadController } from './upload/upload.controller';
import {UploadService} from './upload/upload.service'
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "ok",
      database: "users-management",
      entities: [User],
      synchronize: true,
      driver: require("mysql2") // <--- import the driver here
     // driver: require("mysql") 
    }),
    UsersModule,
    MulterModule.register({
      dest: './csv',
    }),
  ],
  controllers: [AppController, AuthController,UploadController],
  providers: [AppService,UploadService, AuthService],
})
export class AppModule {}

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}