"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqp-connection-manager");
let RabbitMQService = class RabbitMQService {
    async onModuleInit() {
        this.connection = amqp.connect(['amqp://localhost:5672']);
        this.channel = this.connection.createChannel({
            json: true,
            setup: async (channel) => {
                await channel.assertQueue('minigame_result', { durable: true });
            },
        });
        this.connection.on('connect', () => console.log('✅ Connected to RabbitMQ'));
        this.connection.on('disconnect', (err) => console.error('❌ RabbitMQ disconnected', err));
    }
    async publishToQueue(data) {
        await this.channel.sendToQueue('minigame_result', Buffer.from(JSON.stringify(data)));
    }
    async onModuleDestroy() {
        await this.connection.close();
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = __decorate([
    (0, common_1.Injectable)()
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map