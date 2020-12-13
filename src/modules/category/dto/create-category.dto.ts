import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ uniqueItems: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;
}
