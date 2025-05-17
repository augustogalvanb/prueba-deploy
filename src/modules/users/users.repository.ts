import { BadRequestException, HttpCode, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/User.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { createUserDto } from "./dtos/createUser.dto";
import { loginUserDto } from "../auth/dtos/loginUser.dto";
import { Role } from "../../enums/roles.enum";
import { updateUserDto } from "./dtos/updateUser.dto";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    @HttpCode(200)
    async getUsers(page: number, limit: number) {
    
        const [users] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,  // Desplazamiento (offset)
            take: limit,               // Número de elementos a traer
        });

        return users
    }

    @HttpCode(200)
    async getUserById(id:string){
         const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
              orders_id: {
                order_details: {
                  products: true, // Carga la relación products dentro de order_details
                },
              },
            },
            select: {
              orders_id: {
                id: true,
                date: true,
                order_details: {
                  id: true,
                  price: true,
                  products: {
                    id: true,
                    name: true, // Selecciona name de los productos
                  },
                },
              },
            },
          });
        if(!user) {return 'Usuario no encontrado'}
        else {
            const { administrator, ...userFound } = user;
            return userFound
        }
        
    }

    async signup(user: createUserDto) {
        const checkEmail = await this.usersRepository.findOneBy({ email: user.email })
        if(checkEmail) throw new BadRequestException('El email está en uso')
        else {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            if(!hashedPassword) throw new BadRequestException('No se pudo hashear la contraseña') 
            await this.usersRepository.save({...user, password: hashedPassword })
            return `usuario ${user.email} creado con éxito, ${hashedPassword}`
        }
        
    }

    async signin(credentials: loginUserDto) {
        const findEmail = await this.usersRepository.findOneBy({ email: credentials.email }) //recibo el user
        if(findEmail) {
            const validatePassword = await bcrypt.compare(credentials.password, findEmail.password ) //recibe contraseña y hash de db
            if(validatePassword){
                const userPayload = {
                    id: findEmail.id,
                    email: findEmail.email,
                    role: [findEmail.administrator === Role.Admin ? Role.Admin : Role.User]
                }
                const token = this.jwtService.sign(userPayload)
                return {message: 'inicio de sesión exitoso', token}
            } 
            else { throw new BadRequestException('credenciales inválidas') }
        }
        else { throw new BadRequestException('credenciales inválidas') }
    }

    @HttpCode(200)
    async updateUserById(id: string, userData: updateUserDto) {
        const user = await this.usersRepository.findOneBy({id})
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        
        Object.keys(userData).forEach(key => {
            if (userData[key] !== undefined) {
                  user[key] = userData[key];
             }
        });

        await this.usersRepository.save(user);
        return `El usuario de id: ${id} fue actualizado con éxito`
    }

    @HttpCode(200)
    async deleteUserById(id: string) {
        const user = await this.usersRepository.findOneBy({id})
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        
        await this.usersRepository.delete(id)
        return `Usuario de id: ${id} eliminado exitosamente`
    }
}