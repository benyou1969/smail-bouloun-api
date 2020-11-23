import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductPropertyService } from './product-property.service';
import { CreateProductPropertyDto } from './dto/create-product-property.dto';
import { UpdateProductPropertyDto } from './dto/update-product-property.dto';

@Controller('product-property')
export class ProductPropertyController {
  constructor(
    private readonly productPropertyService: ProductPropertyService,
  ) {}

  @Post()
  create(@Body() createProductPropertyDto: CreateProductPropertyDto) {
    return this.productPropertyService.create(createProductPropertyDto);
  }

  @Get()
  findAll() {
    return this.productPropertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPropertyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPropertyDto: UpdateProductPropertyDto,
  ) {
    return this.productPropertyService.update(id, updateProductPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPropertyService.remove(id);
  }
}
