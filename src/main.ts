import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Secure Data API')
    .setDescription('API for managing secure data')
    .setVersion('1.0')
    .addTag('users')
    .addApiKey(
      { type: 'apiKey', name: 'x-password', in: 'header' },
      'password',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
