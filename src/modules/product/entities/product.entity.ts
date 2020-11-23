import { GenericEntity } from 'src/common/entities/generic.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

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

  @ManyToOne((type) => Category, (category) => category.products, {
    eager: false,
  })
  category: Category;
}
