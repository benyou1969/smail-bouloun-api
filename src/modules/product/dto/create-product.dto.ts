import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  IsPositive,
  IsArray,
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

  @IsArray()
  @IsOptional()
  @ApiProperty({ default: [{}] })
  options: Array<{
    property: {
      id: number;
      key: string;
      value: any;
    };
  }>;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag_id: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  product_property_ids: [];
}
