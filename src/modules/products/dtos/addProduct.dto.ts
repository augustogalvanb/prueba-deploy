import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class addProductDto {
    
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    description: string
    
    @IsNotEmpty()
    @IsNumber()
    price: number
    
    @IsNotEmpty()
    @IsNumber()
    stock: number
    
    @IsNotEmpty()
    @IsString()
    category: string
}