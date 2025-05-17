import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middelwares/logger.middelware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  const swaggerConfig = new DocumentBuilder()
                            .setTitle('Proyecto M4')
                            .setDescription('Api ecommerce construida con Nestjs')
                            .setVersion('1.0')
                            .addBearerAuth()
                            .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();