import { Injectable } from '@nestjs/common';
import { OrdersRespository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRespository) {}

  addOrder(idUser: string, products: any) {
    return this.ordersRepository.addOrder(idUser, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
