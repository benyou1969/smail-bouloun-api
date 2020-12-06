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
  async generateTag(): Promise<Tag> {
    const tag = new Tag();
    tag.id = uuid();
    tag.name = uuid();
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

  async createTag(createTagDto: CreateTagDto, response): Promise<Tag> {
    const { name, description, category_id } = createTagDto;
    const category = await Category.findOne(category_id);
    const tag = new Tag();
    const images = [];
    tag.id = uuid();
    tag.name = name;
    tag.description = description;
    tag.category = category;
    console.log('element', response);
    response.forEach((element) => {
      console.log('element', element);
      images.push(`http://localhost:8080/imgs/tag/${element.filename}`);
    });
    tag.images = images;
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

  async updateTag(id: string, updateTagDto: UpdateTagDto, response) {
    const { name, description } = updateTagDto;
    const images = [];
    response.forEach((element) => {
      console.log('element', element);
      images.push(`http://localhost:8080/imgs/tag/${element.filename}`);
    });
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
