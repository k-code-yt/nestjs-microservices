import { Controller, Post, Body } from '@nestjs/common';
import { KafkaService, UserCreatedEvent } from './kafka/kafka.service';

export class CreateUserDto {
  email: string;
  name: string;
}

@Controller('api')
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userId = `user_${Date.now()}`;

    const userCreatedEvent: UserCreatedEvent = {
      userId,
      email: createUserDto.email,
      name: createUserDto.name,
      createdAt: new Date(),
    };

    this.kafkaService.publishUserCreated(userCreatedEvent);

    return {
      success: true,
      userId,
    };
  }
}
