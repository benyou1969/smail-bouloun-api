import { GenericEntity } from 'common/entities/generic.entity';
import { Product } from 'modules/product/entities/product.entity';
import { Tag } from 'modules/tag/entities/tag.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('ProductProperties')
export class ProductProperty extends GenericEntity {
  @Column()
  propertyName: string;
  @Column()
  propertyValue: string;

  @ManyToMany((type) => Tag, (tag) => tag.properties, {
    eager: false,
  })
  tags: Tag[];

  @ManyToMany((type) => Product, (product) => product.product_properties, {
    eager: false,
    cascade: true,
  })
  products: Product[];
}
