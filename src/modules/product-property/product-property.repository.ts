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
    const { propertyName, propertyValue, tag_ids } = createProductPropertyDto;
    const tags = await Tag.findByIds(tag_ids);
    const productProperty = new ProductProperty();
    productProperty.id = uuid();
    productProperty.propertyName = propertyName;
    productProperty.propertyValue = propertyValue;
    productProperty.tags = tags;

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
    const { propertyName, propertyValue, tag_ids } = updateProductPropertyDto;
    const tags = await Tag.findByIds(tag_ids);
    console.log(tag_ids);
    console.log(tags);
    const productProperty = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('ProductProperty not found');
    });
    productProperty.propertyName = propertyName
      ? propertyName
      : productProperty.propertyName;
    productProperty.propertyValue = propertyValue
      ? propertyValue
      : productProperty.propertyValue;
    productProperty.tags = tags?.length ? tags : productProperty.tags;

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
