import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply helmet middleware with proper Express types
  app.use((req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const helmetMiddleware = helmet();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return helmetMiddleware(req, res, next);
  });
  app.enableCors();
  await app.listen(3000);
  console.log('Listening on http://localhost:3000');
}
bootstrap();
