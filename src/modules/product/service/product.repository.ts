import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, description } = createProductDto;
    const product = new Product();
    product.id = uuid();
    product.name = name;
    product.description = description;
    product.price = price;

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
}
