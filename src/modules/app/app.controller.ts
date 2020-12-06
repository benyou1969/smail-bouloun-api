import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { name: string } {
    return this.appService.getHello();
  }

  @Get('/imgs/category/:image')
  seeUploadedFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
  @Get('/imgs/tag/:image')
  seeUploadedFiles(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
