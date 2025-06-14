import * as puppeteer from 'puppeteer';
import { AbstractGameScraper } from './abstract-game.scrapper';
import { Document } from 'src/interface/document.interface';
import { MongoResult } from 'src/schema/mongo-result.schema';
import { Model } from 'mongoose';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
export declare class Speed4 extends AbstractGameScraper {
    private readonly mongoResultModel;
    private readonly rabbitMq;
    constructor(mongoResultModel: Model<MongoResult>, rabbitMq: RabbitMQService);
    gameName: string;
    getUrl(): string;
    scrape(browser: puppeteer.Browser): Promise<Document[]>;
}
