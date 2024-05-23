import { Categories } from 'src/categories/categories.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffree-png-vectors%2Fsubir-archivos&psig=AOvVaw3hB3G9bRtPN2YeKwORHnvU&ust=1715378884633000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjItcbKgYYDFQAAAAAdAAAAABAE',
  })
  imgUrl: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
