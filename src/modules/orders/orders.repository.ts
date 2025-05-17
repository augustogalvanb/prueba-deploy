import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/Order.entity";
import { OrderDetails } from "src/entities/OrderDetails.entity";
import { Product } from "src/entities/Product.entity";
import { User } from "src/entities/User.entity";
import { In, MoreThan, Repository } from "typeorm";
import { createOrderDto } from "./dtos/createOrder.dto";

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>
  ) {}

    async addOrder(order: createOrderDto) {
      const user = await this.usersRepository.findOneBy({ id: order.user_id })
      if(user) {
        const idsProducts = order.products.map((product) => product.id)
        const products = await this.productsRepository.find({
          where: {
            id: In(idsProducts), // Usamos `In` para buscar múltiples IDs
            stock: MoreThan(0),         // Solo productos con stock mayor a 0
          },
        })
      if (products){
        let priceTotal = 0
        for (const product of products) {
          
          const price = parseFloat(product.price.toString()); // Convertir precio a número
          product.stock -= 1; // Reducir el stock en 1
          priceTotal = priceTotal + price
        }
        await this.productsRepository.save(products); // Guardar los cambios de los productos
        
        priceTotal = parseFloat(priceTotal.toFixed(2));
        //detalle de compra
        const orderDetails = {
          price: priceTotal,
          products: products
        }
        const newOrderDetails = await this.orderDetailsRepository.save(orderDetails)
        //orden
        const date = new Date()
        const newOrder = await this.ordersRepository.save({user_id: user, date: date, order_details: newOrderDetails })
        newOrderDetails.order_id = newOrder
        await this.orderDetailsRepository.save(newOrderDetails)
        return 'Orden de compra realizada con éxito'

      } else {
        throw new Error('No hay disponibilidad de productos')
      }
      } else {
        throw new Error('No existe el usuario')
      }
    }

    async getOrderById(id: string) {
      return await this.ordersRepository.findOne({
        where: { id },
        relations: ["order_details", "user_id"], // Cargar la relación order_details
        select: {
          user_id: {
            id: true
          }
        }
      });
    }
}