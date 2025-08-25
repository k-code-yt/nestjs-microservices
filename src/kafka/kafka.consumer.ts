import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreatedEvent, DomainEvents } from './kafka.service';

@Controller()
export class KafkaConsumer {
  private readonly logger = new Logger(KafkaConsumer.name);

  @EventPattern(DomainEvents.UserCreated)
  async handleUserCreated(@Payload() data: UserCreatedEvent) {
    this.logger.log(`Processing user created event\n`, data);

    try {
      await this.processUserCreation(data);

      this.logger.log(
        `Successfully processed user creation for: ${data.userId}`,
      );
    } catch (error) {
      this.logger.error('Failed to process user created event', error);
    }
  }

  private async processUserCreation(data: UserCreatedEvent) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.logger.log(`Creating user profile for ${data.name} (${data.email})`);
    this.logger.log(`Sending welcome email to ${data.email}`);
  }
}
