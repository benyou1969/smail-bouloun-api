import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as RateLimit from 'express-rate-limit';

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

  app.enableCors({ origin: configService.get('CORS_ORIGIN_URL') });
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.use(RateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(parseInt(configService.get('PORT')));
}
bootstrap();
