import { GenericEntity } from 'src/common/entities/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity('ProductProperties')
export class ProductProperty extends GenericEntity {
  @Column()
  propertyName: string;
  @Column()
  propertyValue: string;
}
