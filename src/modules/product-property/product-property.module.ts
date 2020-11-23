import { Module } from '@nestjs/common';
import { ProductPropertyService } from './product-property.service';
import { ProductPropertyController } from './product-property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPropertyRepository } from './product-property.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPropertyRepository])],
  controllers: [ProductPropertyController],
  providers: [ProductPropertyService],
})
export class ProductPropertyModule {}
