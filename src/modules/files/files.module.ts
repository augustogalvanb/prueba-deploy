import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { cloudinaryConfig } from "src/config/cloudinary.config";
import { CloudinaryService } from "src/common/cloudinary.service";
import { ProductModule } from "../products/products.module";

@Module({
    imports: [ProductModule],
    providers: [cloudinaryConfig, CloudinaryService],
    controllers: [FilesController],
    exports: []
})
export class FileModule{}