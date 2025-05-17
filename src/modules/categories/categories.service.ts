import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { categoryDto } from "./dtos/createCategory.dto";
@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    getCategories() {
        return this.categoriesRepository.getCategories()
    }

    addCategories(categoryData: categoryDto[]) {
        return this.categoriesRepository.addCategories(categoryData)
    }

    getCategoryByName(name: string) {
        return this.categoriesRepository.getCategoryByName(name)
    }

    getCategoryById(id: string) {
        return this.categoriesRepository.getCategoryById(id)
    }
}