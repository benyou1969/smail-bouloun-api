import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './controller/product.controller';
import { ProductRepository } from './service/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
