import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hospital API')
    .setDescription('The hospital API description')
    .setVersion('1.0')
    .addTag('hospital')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
   app.use(cookieParser()); 
   app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
