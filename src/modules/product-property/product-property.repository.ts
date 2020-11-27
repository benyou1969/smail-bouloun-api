import { v4 as uuid } from 'uuid';

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { UpdateProductPropertyDto } from './dto/update-product-property.dto';
import { CreateProductPropertyDto } from './dto/create-product-property.dto';
import { ProductProperty } from './entities/product-property.entity';
import { Tag } from '../tag/entities/tag.entity';

@EntityRepository(ProductProperty)
export class ProductPropertyRepository extends Repository<ProductProperty> {
  async createProductProperty(
    createProductPropertyDto: CreateProductPropertyDto,
  ): Promise<ProductProperty> {
    const { propertyName, propertyValue, tag_id } = createProductPropertyDto;
    const tag = await Tag.findOne(tag_id);
    const productProperty = new ProductProperty();
    productProperty.id = uuid();
    productProperty.propertyName = propertyName;
    productProperty.propertyValue = propertyValue;
    productProperty.tag = tag;

    try {
      return await productProperty.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('ProductProperty Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async updateProductProperty(
    id: string,
    updateProductPropertyDto: UpdateProductPropertyDto,
  ) {
    const { propertyName, propertyValue } = updateProductPropertyDto;
    const productProperty = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('ProductProperty not found');
    });
    productProperty.propertyName = propertyName || productProperty.propertyName;
    productProperty.propertyValue =
      propertyValue || productProperty.propertyValue;

    try {
      return await productProperty.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('ProductProperty Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
