import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

import { GenericEntity } from 'src/common/entities/generic.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductProperty } from 'src/modules/product-property/entities/product-property.entity';

@Entity('tags')
@Unique(['name'])
export class Tag extends GenericEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  images: string;

  @OneToMany((type) => Product, (product) => product.tag, {
    eager: true,
  })
  products: Product[];

  @OneToMany((type) => ProductProperty, (property) => property.tag, {
    eager: false,
  })
  properties: ProductProperty[];

  @ManyToOne((type) => Category, (category) => category.tags, {
    eager: true,
  })
  category: Category;
}
