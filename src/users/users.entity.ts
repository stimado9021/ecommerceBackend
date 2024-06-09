import { Matches } from 'class-validator';
import { Orders } from 'src/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
 
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffree-png-vectors%2Fsubir-archivos&psig=AOvVaw3hB3G9bRtPN2YeKwORHnvU&ust=1715378884633000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjItcbKgYYDFQAAAAAdAAAAABAE',
  })
  imgUrlUser: string;

  @Column({
    type: 'varchar',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    default: 'user',
  })
  roles: string;

  @Column()
  createdAt: string | undefined;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
