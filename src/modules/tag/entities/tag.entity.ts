import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { GenericEntity } from 'common/entities/generic.entity';
import { Category } from 'modules/category/entities/category.entity';
import { Product } from 'modules/product/entities/product.entity';
import { ProductProperty } from 'modules/product-property/entities/product-property.entity';

@Entity('tags')
@Unique(['name'])
export class Tag extends GenericEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @OneToMany((type) => Product, (product) => product.tag, {
    eager: true,
  })
  products: Product[];

  @ManyToMany((type) => ProductProperty, (property) => property.tags, {
    eager: true,
  })
  @JoinTable()
  properties: ProductProperty[];

  @ManyToOne((type) => Category, (category) => category.tags, {
    eager: true,
  })
  category: Category;
}
