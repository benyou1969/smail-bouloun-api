import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/guard/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'utils/uploadfile';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('images', {
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
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return this.categoryService.create(createCategoryDto, response);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  generateCategory() {
    return this.categoryService.generateCategory();
  }
}
