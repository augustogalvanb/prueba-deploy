import { BadRequestException, Body, Controller, HttpException, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { SetDefaultRolePipe } from "src/pipes/setDefaultRole.pipe";
import { UsersService } from "../users/users.service";
import { createUserDto } from "../users/dtos/createUser.dto";
import { loginUserDto } from "./dtos/loginUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @UsePipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: (errors) => {
                        const cleanErrors = errors.map((error) => {
                            return {property: error.property, constraints: error.constraints}
                        })
                        return new BadRequestException({
                            alert: "error detectado",
                            errors: cleanErrors
                        })
                    }  
            }
        ),
        SetDefaultRolePipe
    )
    signup(@Body() user: createUserDto) {
        return this.usersService.signup(user)
    }
    
    @Post('signin')
    signin(@Body(new ValidationPipe()) credentials: loginUserDto) {
        return this.usersService.signin(credentials)
    } 
}