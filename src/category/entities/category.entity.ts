import { GenericEntity } from 'src/common/entities/generic.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('category')
@Unique(['name'])
export class Category extends GenericEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  images: string;
}
