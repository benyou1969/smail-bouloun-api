import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { CategoryModule } from 'src/modules/category/category.module';
import { Category } from 'src/modules/category/entities/category.entity';
import { ProductProperty } from 'src/modules/product-property/entities/product-property.entity';
import { ProductPropertyModule } from 'src/modules/product-property/product-property.module';
import { SnakeNamingStrategy } from 'src/utils/strategies';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../product/entities/product.entity';
import { ProductModule } from '../product/product.module';
import { Tag } from '../tag/entities/tag.entity';
import { TagModule } from '../tag/tag.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DATABASE_URL'),
        type: 'postgres',
        entities: [User, Product, Category, ProductProperty, Tag],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    TagModule,
    ProductModule,
    ProductPropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
