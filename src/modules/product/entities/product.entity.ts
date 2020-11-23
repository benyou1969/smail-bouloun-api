import { GenericEntity } from 'src/common/entities/generic.entity';
import { Column, Entity, Unique } from 'typeorm';

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
}
