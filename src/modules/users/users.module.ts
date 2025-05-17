import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: []
})
export class UserModule {}