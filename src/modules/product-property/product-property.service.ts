import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductPropertyDto } from './dto/create-product-property.dto';
import { UpdateProductPropertyDto } from './dto/update-product-property.dto';
import { ProductPropertyRepository } from './product-property.repository';

@Injectable()
export class ProductPropertyService {
  constructor(
    @InjectRepository(ProductPropertyRepository)
    private readonly productPropertyRepository: ProductPropertyRepository,
  ) {}

  async create(createProductPropertyDto: CreateProductPropertyDto) {
    return await this.productPropertyRepository.createProductProperty(
      createProductPropertyDto,
    );
  }

  async findAll() {
    return await this.productPropertyRepository.find();
  }

  async findOne(id: string) {
    return await this.productPropertyRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`item with id '${id}' was not found`);
    });
  }

  async update(id: string, updateProductPropertyDto: UpdateProductPropertyDto) {
    return await this.productPropertyRepository.updateProductProperty(
      id,
      updateProductPropertyDto,
    );
  }

  async remove(id: string) {
    const result = await this.productPropertyRepository.delete({ id });
    console.log(result);
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
