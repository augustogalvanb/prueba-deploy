import { Module } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../users/users.repository";
import { User } from "src/entities/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepository],
    controllers: [AuthController],
    exports: []
})
export class AuthModule{}