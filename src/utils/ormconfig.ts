import { ConfigService } from '@nestjs/config';
import { Category } from 'modules/category/entities/category.entity';
import { ProductProperty } from 'modules/product-property/entities/product-property.entity';
import { Product } from 'modules/product/entities/product.entity';
import { Tag } from 'modules/tag/entities/tag.entity';
import { User } from 'modules/user/user.entity';
import { join } from 'path';

import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from './strategies';

const configService = new ConfigService();

export const config: ConnectionOptions = {
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User, Product, Category, ProductProperty, Tag],
  migrations: [join(__dirname, `../migrations/*{.ts,.js}`)],
  migrationsRun: true,
  synchronize: false,
  logging: true,
  logger: 'file',
};
