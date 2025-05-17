import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { ApiBearerAuth, ApiBody, ApiQuery } from "@nestjs/swagger";
import { updateProductDto } from "./dtos/updateProduct.dto";
import { limitDto, pageDto } from "../users/dtos/pagination.dto";
import { Signin } from "src/guards/signin.guard";
import { addProductDto } from "./dtos/addProduct.dto";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: String, default: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Número de límite', type: String, default: 5 })
    getProducts (
        @Query(new ValidationPipe({ transform: true })) pageData: pageDto,
        @Query(new ValidationPipe({ transform: true })) limitData: limitDto
    ) {
        const page = pageData.page || 1
        const limit = limitData.limit || 5
        return this.productsService.getProducts(page, limit)
    }

    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id)
    }

    @Post('seeder')
    @ApiBody({
        type: [addProductDto], // Tipo del cuerpo (array de AddProductDto)
        required: false,       // Indica que el cuerpo es opcional en Swagger
        description: 'Lista opcional de productos a agregar',
    })
    @UsePipes(new ValidationPipe({
        whitelist: true // Elimina propiedades no definidas en el DTO
    }))
    addProduct(@Body() productData: addProductDto[]) {
        const data = Array.isArray(productData) ? productData : [];
        return this.productsService.addProduct(data)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(Signin, RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body(new ValidationPipe()) productData: updateProductDto) {
        return this.productsService.updateProduct(id, productData)
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id)
    }
}