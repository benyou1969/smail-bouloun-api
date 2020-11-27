import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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
  @IsString()
  @IsOptional()
  tag_id: string;
}
