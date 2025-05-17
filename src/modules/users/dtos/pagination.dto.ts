import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class pageDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))  // Asegura que el valor se convierta a número
  page: number;
}

export class limitDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value))
  limit: number;
}
