import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authRepository } from './auth.repository';
import { UsersRepository } from 'src/users/users.repository';
import { Users } from 'src/users/users.entity';
import { UsersDBService } from 'src/users/usersDb.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    authRepository,
    UsersRepository,
    UsersDBService]
})
export class AuthModule {}
