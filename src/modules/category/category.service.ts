import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async generateCategory() {
    return await this.categoryRepository.generateCategory();
  }

  async create(createCategoryDto: CreateCategoryDto, response) {
    return await this.categoryRepository.createCategory(
      createCategoryDto,
      response,
    );
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`item with id '${id}' was not found`);
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, response) {
    return await this.categoryRepository.updateCategory(
      id,
      updateCategoryDto,
      response,
    );
  }

  async remove(id: string) {
    const result = await this.categoryRepository.softDelete({ id });
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
