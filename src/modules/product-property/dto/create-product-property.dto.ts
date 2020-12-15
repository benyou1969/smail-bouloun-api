import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductPropertyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  propertyValue: any;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  tag_ids: string[];
}
