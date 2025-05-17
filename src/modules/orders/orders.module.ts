import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/Order.entity";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrdersController } from "./orders.controller";
import { User } from "src/entities/User.entity";
import { Product } from "src/entities/Product.entity";
import { OrderDetails } from "src/entities/OrderDetails.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([OrderDetails]),
    ],
    providers: [OrdersService, OrdersRepository],
    controllers: [OrdersController]
}
)
export class OrderModule {}