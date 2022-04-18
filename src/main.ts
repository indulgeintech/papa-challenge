import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const PORT = process.env.port || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    setupSwagger(app);
    await app.listen(PORT);
}

bootstrap();