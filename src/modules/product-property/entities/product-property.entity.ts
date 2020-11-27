import { GenericEntity } from 'src/common/entities/generic.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('ProductProperties')
export class ProductProperty extends GenericEntity {
  @Column()
  propertyName: string;
  @Column()
  propertyValue: string;

  @ManyToOne((type) => Tag, (tag) => tag.properties, {
    eager: false,
  })
  tag: Tag;

  @ManyToMany((type) => Product, (product) => product.product_properties, {
    eager: false,
  })
  products: Product[];
}
