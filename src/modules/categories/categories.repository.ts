import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { Repository } from "typeorm";
import * as data from "../../categories.json"
import { categoryDto } from "./dtos/createCategory.dto";

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

    async getCategories(): Promise<Category[]> {
        const categories = await this.categoriesRepository.find()
        return categories
    }

    async addCategories(categoryData: categoryDto[]) {
        // Determinar si se usan los datos del usuario o del archivo JSON
        const categoriesToProcess = categoryData.length > 0 ? categoryData : data;
        
        const savedCategories: Category[] = [];
                    
        for (const category of categoriesToProcess) {
            const existingCategory = await this.categoriesRepository.findOne({
            where: { name: category.category }
        });

            if (!existingCategory) {
                const newCategory = await this.categoriesRepository.save({name: category.category});
                savedCategories.push(newCategory);
            } 
        }

        if(savedCategories.length === 1) {
            return 'Categoría cargada con éxito'
        } else if (savedCategories.length > 1) {
            return 'Categorías cargadas con éxito'
        } return 'La o las categorías ya existen'
         
    }

    async getCategoryByName(name: string): Promise<Category | null > {
        const category = await this.categoriesRepository.findOne({
            where: { name: name }
        })
        return category
    }

    async getCategoryById(id: string): Promise<Category | null > {
        const category = await this.categoriesRepository.findOne({
            where: { id: id }
        })
        return category
    }
}

