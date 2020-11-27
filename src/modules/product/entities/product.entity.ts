import { GenericEntity } from 'src/common/entities/generic.entity';
import { ProductProperty } from 'src/modules/product-property/entities/product-property.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity('products')
@Unique(['name'])
export class Product extends GenericEntity {
  @Column()
  name: string;
  @Column({ default: true })
  available: boolean;
  @Column({ default: 0 })
  price: number;
  @Column({ nullable: true })
  images: string;
  @Column({ nullable: true })
  reference: string;
  @Column({ nullable: true })
  description: string;
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[{}]'",
    nullable: true,
  })
  options: Array<{
    property: {
      id: number;
      key: string;
      value: any;
    };
  }>;

  @ManyToOne((type) => Tag, (tag) => tag.products, {
    eager: false,
  })
  tag: Tag;

  @ManyToMany((type) => ProductProperty, (property) => property.products, {
    eager: true,
  })
  @JoinTable()
  product_properties: ProductProperty[];
}
