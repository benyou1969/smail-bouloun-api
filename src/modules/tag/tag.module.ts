import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
