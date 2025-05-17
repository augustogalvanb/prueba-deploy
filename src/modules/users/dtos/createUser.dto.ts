import { IsNotEmpty, IsString, IsEmail, IsNumber, MinLength, MaxLength, Matches, IsEnum, IsOptional, Min, Max } from "class-validator"
import { ConfirmPassword } from "../../../decorators/confirmPassword.decorator"
import { Role } from "src/enums/roles.enum"
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"

export class createUserDto {
    @IsNotEmpty()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3)
    @MaxLength(80, { message: 'El nombre no puede superar los 80 caracteres' })
    @ApiProperty({
        description: 'El nombre del usuario debe tener entre 3 y 80 caracteres',
        example: 'Marcos'
    })
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @ApiProperty({
        example: 'Marcos123!'
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, { message: 'La contraseña debe contener una mayúscula, un número, un signo y tener 8 o más caracteres' })
    password: string
    @ApiProperty({
        example: 'Marcos123!'
    })
    @IsNotEmpty()
    @IsString()
    @ConfirmPassword('password', { message: 'Las contraseñas no coinciden' }) //decorador personalizado
    confirmPassword: string
    @IsNotEmpty()
    @IsNumber()
    @Min(1000000000, { message: 'El teléfono debe tener 10 dígitos' }) // 10 dígitos mínimo
    @Max(9999999999, { message: 'El teléfono debe tener 10 dígitos' }) // 10 dígitos máximo
    phone: number
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    @ApiHideProperty()  // Este decorador oculta el campo en Swagger
    administrator?: Role
}