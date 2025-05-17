import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBody } from "@nestjs/swagger";
import { categoryDto } from "./dtos/createCategory.dto";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    getCategories() {
            return this.categoriesService.getCategories()
    }
    
    @Post('seeder')
    @ApiBody({
            type: [categoryDto], // Tipo del cuerpo (array de AddProductDto)
            required: false,       // Indica que el cuerpo es opcional en Swagger
            description: 'Lista opcional de categorías a agregar',
    })
    @UsePipes(new ValidationPipe(
      {
        transform: true,          // Valida y transforma propiedades si es necesario    
        forbidNonWhitelisted: true // Rechaza propiedades no definidads en el DTO lanzando un error
      }
    ))
    addCategories(@Body() categoryData: categoryDto[]) {
      const data = Array.isArray(categoryData) ? categoryData : [];
      return this.categoriesService.addCategories(data);
    }
}