import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe, Delete } from '@nestjs/common';
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
  //@UseGuards(AuthGuard)
  addOrder(@Body() order: any) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')  
  //@UseGuards(AuthGuard)
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @ApiBearerAuth()
  @Get()  
  //@UseGuards(AuthGuard)
  getOrderAll() {
    return this.ordersService.getOrderAll();
  }

  @Delete(':id')
  deleteOrden(@Param('id', ParseUUIDPipe) id:string){
    
    return this.ordersService.deleteOrder(id);
  }

}

