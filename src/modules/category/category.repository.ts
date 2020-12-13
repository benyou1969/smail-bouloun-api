import { v4 as uuid } from 'uuid';
import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async generateCategory(): Promise<Category> {
    const category = new Category();
    category.id = uuid();
    category.name = uuid();
    try {
      return await category.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    response,
  ): Promise<Category> {
    const { name, description } = createCategoryDto;
    const category = new Category();
    category.id = uuid();
    category.name = name;
    category.description = description;
    category.images = response
      ? `${process.env.API_URL}/imgs/category/${response.filename}`
      : null;
    try {
      return await category.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    response,
  ) {
    const { name, description } = updateCategoryDto;
    const category = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('Category not found');
    });
    category.name = name || category.name;
    category.description = description || category.description;
    category.images = response
      ? `${process.env.API_URL}/imgs/category/${response.filename}`
      : category.images;
    try {
      return await category.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
