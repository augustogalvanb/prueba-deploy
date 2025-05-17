import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

Injectable()
export class MinSizeValidatorPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const minSize = 50000
        if(value.size < minSize) throw new BadRequestException("El archivo debe ser mayor a 50KB")
        return value
    }

}