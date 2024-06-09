import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/order.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Products } from 'src/products/products.entity';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRespository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async addOrder(idUser: string, products: any) {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: idUser });
    if (!user) {
      return `Usuario con el id ${idUser} no encontrado`;
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (prod) => {
        const product = await this.productsRepository.findOneBy({
          id: prod.id,
        });

        if (!product) {
          return `producto con id ${prod.id} no encontrado`;
        }

        total += Number(product.price);
        console.log(product.stock);
        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.ordersDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: any) {
    const order = await this.ordersRepository.find({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      return `Orden con id ${id} no encontrada`;
    }
    return order;
  }

  
  async deleteOrder(id:string) {         
     const nroOrders = await this.ordersRepository.find({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

  const prod =  nroOrders[0].orderDetails.products;

 prod.forEach(async  (p)=>{
    const pro = await this.productsRepository.find({where:{id:p.id}});
        pro.forEach(item=>{          
          item.stock = item.stock + 1;      
        })
    await this.productsRepository.save(pro);
  })
  const nOrders = await this.ordersRepository.find({where: { id }})
       const idDet = nOrders[0].orderDetails.id;
       const produ = await this.ordersDetailsRepository.findOne({where:{id:idDet}})
      console.log(produ)
      
     await this.ordersDetailsRepository.createQueryBuilder()
        .delete()
        .from(OrderDetails)
        .where("id = :id",{ id:idDet })
        .execute() 
     await this.ordersRepository.createQueryBuilder()
        .delete()
        .from(Orders)
        .where("id = :id",{ id:id })
        .execute()  
   
  return 'orders delete constraint ordersDetails'
  }

  getOrderAll() {
    return this.ordersRepository.find();
  }

}
