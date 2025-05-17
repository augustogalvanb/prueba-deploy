import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { createUserDto } from "./dtos/createUser.dto";
import { updateUserDto } from "./dtos/updateUser.dto";
import { loginUserDto } from "../auth/dtos/loginUser.dto";


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(page: number, limit: number) {  
        return this.usersRepository.getUsers(page, limit)    
    }

    getUserById(id: string) {
        return this.usersRepository.getUserById(id)
    }

    signup(user: createUserDto) {
        return this.usersRepository.signup(user)
    }

    signin(credentials: loginUserDto) {
        return this.usersRepository.signin(credentials)
    }

    updateUserById(id: string, userData: updateUserDto) {
        return this.usersRepository.updateUserById(id, userData)
    }
    
    deleteUserById(id: string) {
        return this.usersRepository.deleteUserById(id)
    }
}