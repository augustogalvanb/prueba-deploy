import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { createOrderDto } from "./dtos/createOrder.dto";
import { Signin } from "src/guards/signin.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(Signin)
    getOrderById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrderById(id)
    }
    
    @ApiBearerAuth()
    @Post()
    @UseGuards(Signin)
    @UsePipes(new ValidationPipe({transform: true}))
    addOrder(@Body() order: createOrderDto) {
        return this.ordersService.addOrder(order)
    }
}