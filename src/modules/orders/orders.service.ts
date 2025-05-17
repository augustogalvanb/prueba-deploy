import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { createOrderDto } from "./dtos/createOrder.dto";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    addOrder(order: createOrderDto) {
        return this.ordersRepository.addOrder(order)
    }

    getOrderById(id: string) {
        return this.ordersRepository.getOrderById(id)
    }
}