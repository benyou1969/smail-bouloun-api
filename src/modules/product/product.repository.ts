import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Tag } from '../tag/entities/tag.entity';
import { ProductProperty } from '../product-property/entities/product-property.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      price,
      description,
      options,
      tag_id,
      product_property_ids,
    } = createProductDto;
    const tag = await Tag.findOne(tag_id);
    const product_properties = await ProductProperty.findByIds(
      product_property_ids,
    );
    const product = new Product();
    product.id = uuid();
    product.name = name;
    product.description = description;
    product.price = price;
    product.options = options;
    product.tag = tag;
    product.product_properties = product_properties;

    try {
      return await product.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const {
      name,
      description,
      images,
      available,
      price,
      reference,
    } = updateProductDto;
    const product = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('Product not found');
    });
    product.name = name || product.name;
    product.price = price || product.price;
    product.images = images || product.images;
    product.available = available || product.available;
    product.reference = reference || product.reference;
    product.description = description || product.description;
    try {
      return await product.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('product Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
