import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaConsumer } from './kafka/kafka.consumer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
  ],
  controllers: [AppController, KafkaConsumer],
})
export class AppModule {}
