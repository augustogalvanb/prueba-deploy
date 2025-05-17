import { IsString, IsInt, IsOptional, Length, IsUrl, Min, IsNumber } from 'class-validator';

export class updateProductDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string
}
