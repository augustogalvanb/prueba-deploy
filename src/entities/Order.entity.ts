import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { User } from "./User.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @ManyToOne(() => User, (user) => user.orders_id)
    @JoinColumn({ name: 'user_id'})
    user_id: User
    @Column()
    date: Date
    @OneToOne(()=> OrderDetails)
    @JoinColumn()
    order_details: OrderDetails
}