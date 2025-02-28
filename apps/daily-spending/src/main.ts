import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configurazione di Swagger
  const config = new DocumentBuilder()
    .setTitle('Fastify API')
    .setDescription('Documentazione API con Fastify e Swagger')
    .setVersion('1.0')
    .addTag('example') // Aggiungi un tag opzionale
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // L'endpoint sarà /docs

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0'); // Ascolta sulla porta 3000
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
