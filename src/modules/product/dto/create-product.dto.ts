import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  available: boolean;

  @IsInt()
  @IsPositive()
  price: number;

  @IsOptional()
  images: string;

  @IsString()
  @IsOptional()
  reference: string;

  @IsString()
  @IsOptional()
  description: string;
}
