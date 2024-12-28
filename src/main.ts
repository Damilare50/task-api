import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeFactory as exceptionFactory } from './general/factory';
import { config } from 'node-config-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory,
      whitelist: true,
    }),
  );

  await app.listen(config.PORT);
}
bootstrap();
