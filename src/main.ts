import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    // origin: ['http://localhost:8080', configService.get('CORS_ORIGIN_URL')],
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.use(helmet());

  app.use(compression());
  // app.use(RateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(parseInt(configService.get('PORT')));
}
bootstrap();
