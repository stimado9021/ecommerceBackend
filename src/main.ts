import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewares } from './middlewares/loggerMiddlewares';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Proyecto backend del M4 ft48')
    .setDescription('proyecto  del backend api de ecommerce')
    .setVersion('1.0')  
    .addBearerAuth()  
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(loggerMiddlewares);
  await app.listen(3000);
  console.log('Server listering  on http://localhost:3000');
}
bootstrap();
