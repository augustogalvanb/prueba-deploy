import { BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function categoryValidator(req: Request, res: Response, next: NextFunction) {
    const categories = req.body
    //chequeo array
    if(Array.isArray(categories)){
      // Validar cada categoría
      categories.forEach((item, index) => {
      if (typeof item.category !== 'string' || item.category.trim().length === 0) {
        throw new BadRequestException(`La categoría en el índice ${index} debe ser una cadena no vacía.`);
      }
      });
    }
    next()
}