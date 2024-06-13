import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  
  const logger = new Logger('Payments-ms');
  
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
    }, 
  }, { inheritAppConfig: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  await app.startAllMicroservices();

  await app.listen(envs.port);

  logger.log(`Payments microservice running on port ${envs.port}`);
}
bootstrap();
