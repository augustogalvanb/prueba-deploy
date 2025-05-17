import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from "../products/products.service";
import { CloudinaryService } from "src/common/cloudinary.service";
import { MinSizeValidatorPipe } from "src/pipes/minSizeValidator.pipe";
import { Signin } from "src/guards/signin.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UploadFileDto } from "./dtos/uploadFile.dto";

@Controller('files')
export class FilesController {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly productsService: ProductsService
    ){}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(Signin)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(MinSizeValidatorPipe)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Subir una imagen para el producto',
        type: UploadFileDto,
    })
    async uploadImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 5000000,
                        message: "El archivo debe ser menor a 5MB"
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/
                    })
                ]
            })
        ) file: Express.Multer.File
    ) {
        const result = await this.cloudinaryService.uploadImage(file)
        const imgUrl = result.secure_url
        return this.productsService.updateProduct(id, {imgUrl})
    }
}