import { IsString, IsEmail, Length, IsOptional, IsInt, Matches } from "class-validator"

export class updateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    name?: string;
    @IsOptional()
    @IsEmail()
    @Length(1, 50)
    email?: string
    @IsOptional()
    @Length(8, 255)
    password?: string;
    @IsOptional()
    @IsInt()
    @Matches(/^[0-9]{10}$/)
    phone?: number;
    @IsOptional()
    @IsString()
    @Length(1, 50)
    country?: string;
    @IsOptional()
    @IsString()
    @Length(1, 255)
    address?: string;
    @IsOptional()
    @IsString()
    @Length(1, 50)
    city?: string;
}