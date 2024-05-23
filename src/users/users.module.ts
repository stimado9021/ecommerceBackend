import { Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersDBService } from "./usersDb.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([Users])
    ],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository,UsersDBService],
  })
export class UsersModule{}