import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { GenericEntity } from 'common/entities/generic.entity';
import { Tag } from 'modules/tag/entities/tag.entity';

@Entity('category')
@Unique(['name'])
export class Category extends GenericEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  images: string;

  @OneToMany((type) => Tag, (tag) => tag.category, {
    eager: false,
  })
  tags: Tag[];
}
