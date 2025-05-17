import { HttpCode, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";
import * as data from "../../products.json"
import { updateProductDto } from "./dtos/updateProduct.dto";
import { addProductDto } from "./dtos/addProduct.dto";
import { CategoriesService } from "../categories/categories.service";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService
  ) {}

    @HttpCode(200)
    async getProducts(page: number, limit: number): Promise<Product[]> {
      const [products] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['category'],
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          stock: true,
          imgUrl: true,
          category: {
            id: true,
            name: true,
          },
        },
        order: {
          name: 'ASC', // orden alfabético
        }
      });
      return products;
    }

    @HttpCode(200)
    async getProductById(id: string) {
        const product = await this.productsRepository.findOneBy({id})
        if(!product) return 'No existe el producto'
        return product
    }

    @HttpCode(201)
    async addProduct(productData: addProductDto[]){
      // Determinar si se usan los datos del usuario o del archivo JSON
      const productsToProcess = productData.length > 0 ? productData : data;
      
      const savedProducts: Product[] = [];
                      
      for (const product of productsToProcess) {
        const existingProduct = await this.productsRepository.findOne({
        where: { name: product.name }
        });

        if (!existingProduct) {
          const category = await this.categoriesService.getCategoryByName(product.category)

          if(category) {
            const newProduct = this.productsRepository.create({
              ...product,
              category: category
            })
            const savedProduct = await this.productsRepository.save(newProduct);
            savedProducts.push(savedProduct);
          }
        } 
      }

      if (savedProducts.length === 1) {
        return 'Producto cargado con éxito'
      } else if (savedProducts.length > 1) {
        return 'Productos cargados con éxito'
      } return 'El o los productos ya existen'
    }
    
    @HttpCode(200)
    async updateProduct(id: string, productData: updateProductDto) {
        const product = await this.productsRepository.findOneBy({id})
        if(!product) throw new NotFoundException(`producto con id ${id} no encontrado`)
        
        Object.keys(productData).forEach(key => {
              product[key] = productData[key];
        });
        
        await this.productsRepository.save(product)
        return `El producto de id: ${id} fue actualizado con éxito`
    }

    async deleteProduct(id: string) {
      const product = await this.productsRepository.findOneBy({id})
      if(!product) throw new NotFoundException(`producto con id ${id} no encontrado`)
      await this.productsRepository.delete(id)
      return 'Producto eliminado con éxito'
  }
}