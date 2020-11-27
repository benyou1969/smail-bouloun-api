import { v4 as uuid } from 'uuid';
import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Category } from '../category/entities/category.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name, description, category_id } = createTagDto;
    const category = await Category.findOne(category_id);
    const tag = new Tag();
    tag.id = uuid();
    tag.name = name;
    tag.description = description;
    tag.category = category;
    try {
      return await tag.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Tag Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto) {
    const { name, description, images } = updateTagDto;
    const tag = await this.findOneOrFail({ id }).catch((e) => {
      throw new NotFoundException('Category not found');
    });
    tag.name = name || tag.name;
    tag.description = description || tag.description;
    tag.images = images || tag.images;
    try {
      return await tag.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('tag Already Exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
