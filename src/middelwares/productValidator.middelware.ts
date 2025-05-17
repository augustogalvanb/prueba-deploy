import { BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function productValidator(req: Request, res: Response, next: NextFunction) {
    const products = req.body
    //chequeo array
    if(Array.isArray(products)){
    // Validar cada producto
    products.forEach((item, index) => {
        if (typeof item.name !== 'string' || item.name.trim().length === 0) {
          throw new BadRequestException(`El nombre en el índice ${index} debe ser una cadena no vacía.`);
        }
        if (typeof item.description !== 'string' || item.description.trim().length === 0) {
          throw new BadRequestException(`La descripción en el índice ${index} debe ser una cadena no vacía.`);
        }
        if (typeof item.price !== 'number' || item.price < 0) {
          throw new BadRequestException(`El precio en el índice ${index} debe ser un número igual o mayor a 0`);
        }
        if (typeof item.stock !== 'number' || item.stock < 0) {
          throw new BadRequestException(`El stock en el índice ${index} debe ser un número igual o mayor a 0`);
        }
        if (typeof item.category !== 'string' || item.category.trim().length === 0) {
          throw new BadRequestException(`La categoría en el índice ${index} debe ser una cadena no vacía`);
        }
      });
    }
    next()
}