import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto, response) {
    return await this.productRepository.createProduct(
      createProductDto,
      response,
    );
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    return await this.productRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`item with id '${id}' was not found`);
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto, response) {
    return await this.productRepository.updateProduct(
      id,
      updateProductDto,
      response,
    );
  }

  async remove(id: string) {
    const result = await this.productRepository.softDelete({ id });
    console.log(result);
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
