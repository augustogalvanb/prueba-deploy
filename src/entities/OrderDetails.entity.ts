import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Product } from "./Product.entity";
import { Order } from "./Order.entity";

@Entity({
    name: 'order_details'
})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number
    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order_id: Order
    @ManyToMany(() => Product, (product) => product.order_details)
    @JoinTable({ name: 'order_details_products' })
    products: Product[]
}