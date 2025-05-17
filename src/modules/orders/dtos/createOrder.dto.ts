import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { Product } from "src/entities/Product.entity"

class productDto extends PartialType(Product){
    @IsNotEmpty()
    @IsUUID()
    id: string;
}

export class createOrderDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string
    @ApiProperty({
        description: 'Lista de productos en la orden',
        type: [productDto],  // Indica que se espera un array de productDto
        example: [
            {
                id: '7b304998-65bd-4d52-b072-f2d844944ffd',  //ejemplo con arreglo y el id del producto
            },
        ],
    })
    @IsArray()
    @ArrayMinSize(1)
    /*@ValidateNested() sin { each: true } solo sirve para un solo objeto*/
    /*con { each: true } cuando se tiene una propiedad que es un array de instancias de clases
    y quieres que cada elemento del array sea validado según sus propias reglas de validación.*/
    @ValidateNested({each: true})
    // convierta cada elemento del array en una instancia de productDto
    // y así las validaciones en productDto podrán ejecutarse correctamente.
    @Type(() => productDto) 
    products: productDto[]
}