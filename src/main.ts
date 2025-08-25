import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { KafkaConstants } from './kafka/kafka.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KafkaConstants.ClientId,
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: KafkaConstants.ConsumerGroups.Default,
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  Logger.debug(
    '🚀 NestJS application with Kafka is running on http://localhost:3000',
  );
  Logger.debug('📊 Kafdrop UI available at http://localhost:9000');
}

bootstrap();
