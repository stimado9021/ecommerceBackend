import { Products } from "src/products/products.entity";
import { Entity,Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity({
    name:'categories'
})

export class Categories{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        unique:true,
        type:'varchar',
        nullable:false,          
    })
    name:string;

    @OneToMany(()=> Products,(product)=>product.category)
    @JoinColumn()
    products?: Products[];
 }
