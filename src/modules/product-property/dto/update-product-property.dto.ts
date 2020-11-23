import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPropertyDto } from './create-product-property.dto';

export class UpdateProductPropertyDto extends PartialType(
  CreateProductPropertyDto,
) {
  propertyName: string;
  propertyValue: any;
}
