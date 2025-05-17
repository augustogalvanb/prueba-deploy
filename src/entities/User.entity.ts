import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Order } from "./Order.entity";
import { Role } from "../enums/roles.enum"
 
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string
    @Column({ type: 'bigint' })
    phone: number
    @Column({ type: 'varchar', length: 50})
    country: string
    @Column()
    address: string
    @Column({ type: 'varchar', length: 50})
    city: string
    @Column({
        type: 'enum',
        enum: Role
      })
    administrator: Role
    @OneToMany(() => Order, (order) => order.user_id)
    orders_id: Order[]
}

