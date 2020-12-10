import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { CategoryModule } from 'modules/category/category.module';
import { ProductPropertyModule } from 'modules/product-property/product-property.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { config } from 'utils/ormconfig';

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
    TypeOrmModule.forRoot(config),
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
