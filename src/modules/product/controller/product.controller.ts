import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { JwtAuthGuard } from 'modules/auth/guard/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'utils/uploadfile';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10000000,
      },
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files) {
    const response = [];
    if (files) {
      files.forEach((file) => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
    }
    return this.productService.create(createProductDto, response);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 10000000,
      },
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files,
  ) {
    const response = [];
    if (files) {
      files.forEach((file) => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
    }
    return this.productService.update(id, updateProductDto, response);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
