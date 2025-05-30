// src/rabbitmq/rabbitmq.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection;
  private channel;

  async onModuleInit() {
    this.connection = amqp.connect(['amqp://localhost:5672']);
    this.channel = this.connection.createChannel({
      json: false,
      setup: async (channel) => {
        await channel.assertQueue('minigames', { durable: true });
      },
    });

    this.connection.on('connect', () => console.log('✅ Connected to RabbitMQ'));
    this.connection.on('disconnect', (err) =>
      console.error('❌ RabbitMQ disconnected', err),
    );
  }

  async publishToQueue(data: any) {
    await this.channel.sendToQueue('minigames', Buffer.from(JSON.stringify(data)));
  }

  async onModuleDestroy() {
    await this.connection.close();
  }
}
