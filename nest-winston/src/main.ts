import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CusLogger } from './CusLogger.log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(new CusLogger());
  await app.listen(3000);
}
bootstrap();
