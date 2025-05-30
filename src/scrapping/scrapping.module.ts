import { Module } from '@nestjs/common';
import { Maze2 } from './strategies/maze-2';
import { Speed4 } from './strategies/speed-4';
import { ScrappingService } from './scrapping.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoResult, MongoResultSchema } from 'src/schema/mongo-result.schema';
import { Speed6 } from './strategies/speed-6';
import { Space8 } from './strategies/space-8';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoResult.name, schema: MongoResultSchema },
    ]),
    RabbitMQModule
  ],
  providers: [
    ScrappingService,
    Maze2,
    Speed4,
    Speed6,
    Space8,
    {
      provide: 'GameScraperStrategies',
      useFactory: (
        maze2: Maze2,
        speed4: Speed4,
        speed6: Speed6,
        space8: Space8
      ) => [maze2,speed4,speed6,space8],
      inject: [Maze2, Speed4, Speed6,Space8],
    }
  ]
})
export class ScrappingModule {}
