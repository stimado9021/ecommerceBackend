import { Products } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
