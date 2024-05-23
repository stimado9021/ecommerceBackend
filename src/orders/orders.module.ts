import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRespository } from './orders.repository';
import { Orders } from 'src/entities/order.entity';
import { Users } from 'src/users/users.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, OrderDetails, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRespository],
})
export class OrdersModule {}
