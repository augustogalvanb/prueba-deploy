import { IsNotEmpty, IsString } from 'class-validator';

export class categoryDto {
  @IsString()
  @IsNotEmpty()
  category: string;
}