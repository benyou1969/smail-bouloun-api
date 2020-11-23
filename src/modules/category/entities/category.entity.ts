import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { GenericEntity } from 'src/common/entities/generic.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Entity('category')
@Unique(['name'])
export class Category extends GenericEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  images: string;

  @OneToMany((type) => Product, (product) => product.category, {
    eager: true,
  })
  products: Product[];
}
