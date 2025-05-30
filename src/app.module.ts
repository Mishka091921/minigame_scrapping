import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrappingModule } from './scrapping/scrapping.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://joshyy:joshyy@cluster0.mngll4q.mongodb.net/minigame_result?retryWrites=true&w=majority&appName=Cluster0',{
      dbName: 'minigame_result',
    }),
    ScrappingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
