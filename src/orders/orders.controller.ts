import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/users/roles.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addOrder(@Body() order: any) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
}
