import {
  UsePipes,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  ValidationPipe,
  ParseUUIDPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { UsersDBService } from './usersDb.service';
import { UsersDto } from './users.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    // private readonly usersService: UsersService,
    private readonly usersDbService: UsersDBService,
  ) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page', ParseIntPipe) page: string,
    @Query('limit', ParseIntPipe) limit: string,
  ) {
    return this.usersDbService.getUsers(Number(page), Number(limit));
  }
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
   
    try {
      const user = this.usersDbService.getUsersById(id);
      return user;
    } catch (error) {
      throw new HttpException(
        `error ${error} controlado y no exploto el server`,
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // @Post()
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(DateAdderInterceptor)
  // createUsers(
  //   @Body() users: UsersDto,
  //   @Req() request: Request & { now: string },
  // ) {
  //   const modifiUsers = { ...users, createdAt: request.now };
  //   return this.usersDbService.createUsers(modifiUsers);
  // }


  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateUsers(@Param('id', ParseUUIDPipe) id: string, @Body() user: any) {
    return this.usersDbService.updateUsers(id, user);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersDbService.deleteUsers(id);
  }
}
