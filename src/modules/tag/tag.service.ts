import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async create(createTagDto: CreateTagDto, response) {
    return await this.tagRepository.createTag(createTagDto, response);
  }
  async generateTag() {
    return await this.tagRepository.generateTag();
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: string) {
    return await this.tagRepository.findOneOrFail(id).catch((e) => {
      throw new NotFoundException(`Tag with id '${id}' was not found`);
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto, response) {
    return await this.tagRepository.updateTag(id, updateTagDto, response);
  }

  async remove(id: string) {
    const result = await this.tagRepository.softDelete({ id });
    if (result.affected === 1) {
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }
}
