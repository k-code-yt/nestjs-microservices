import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { KafkaConstants } from './kafka.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaConstants.InjectionTokens.Client,
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
          producer: {
            allowAutoTopicCreation: true,
            maxInFlightRequests: 1,
            createPartitioner: Partitioners.DefaultPartitioner,
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
