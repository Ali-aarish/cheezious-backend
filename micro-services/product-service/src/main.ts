// Product service entry point — Demo
// Boots the NestJS app and starts listening for HTTP requests.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
  console.log(`🧀 ${config.serviceName} running on http://localhost:${config.port}`);
}

bootstrap();
