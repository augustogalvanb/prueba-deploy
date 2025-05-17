import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from "uuid"
import { OrderDetails } from "./OrderDetails.entity"
import { Category } from "./Category.entity"

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string
    @Column({ type: 'varchar', nullable: false })
    description: string
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number
    @Column({ type: 'int', nullable: false})
    stock: number
    @Column({ type: 'varchar', length: 255, default: 'https://example.com/default-image.jpg'})
    imgUrl: string
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category
    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    order_details: OrderDetails[]
}


















