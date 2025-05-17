import { Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Signin } from "src/guards/signin.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { updateUserDto } from "./dtos/updateUser.dto";
import { limitDto, pageDto } from "./dtos/pagination.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    endpointPrueba(){
        return "Respuesta de prueba"
    }

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(Signin, RolesGuard)
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: String, default: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Número de resultados por página', type: String, default: 5 })
    getUsers(
        @Query(new ValidationPipe({ transform: true })) pageData: pageDto,
        @Query(new ValidationPipe({ transform: true })) limitData: limitDto 
    ) {
        const page = pageData.page || 1 // Asignar valor por defecto de 1 si no se recibe
        const limit = limitData.limit || 5 // Asignar valor por defecto de 5 si no se recibe
        try {
            return this.usersService.getUsers(page, limit)
        } catch (error) {
            throw new HttpException(
                {
                    status: 500,
                    error: "No se pudo obtener los usuarios"
                },
                500
            )
        }
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(Signin)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id)
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(Signin)
    updateUserById(@Param('id', ParseUUIDPipe) id: string, @Body(new ValidationPipe()) userData: updateUserDto) {
        return this.usersService.updateUserById(id, userData)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(Signin)
    deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUserById(id)
    }
}