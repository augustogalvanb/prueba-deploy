import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { ProductsController } from "./products.controller";
import { Product } from "src/entities/Product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../categories/categories.module";
import { productValidator } from "src/middelwares/productValidator.middelware";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
    exports: [ProductsService]
})

export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(productValidator).forRoutes('products/seeder')
    }
}
