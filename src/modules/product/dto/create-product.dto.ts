import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  available: boolean;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  images: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reference: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
