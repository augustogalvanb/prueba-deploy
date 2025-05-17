import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { categoryValidator } from "src/middelwares/categoryValidator.middelware";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
    exports: [CategoriesService, CategoriesRepository]
}
)
export class CategoryModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(categoryValidator).forRoutes('categories/seeder')
    }
}