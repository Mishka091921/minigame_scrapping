import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection;
    private channel;
    onModuleInit(): Promise<void>;
    publishToQueue(data: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
