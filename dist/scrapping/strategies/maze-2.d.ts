import * as puppeteer from 'puppeteer';
import { AbstractGameScraper } from './abstract-game.scrapper';
import { Document } from 'src/interface/document.interface';
import { MongoResult } from 'src/schema/mongo-result.schema';
import { Model } from 'mongoose';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
export declare class Maze2 extends AbstractGameScraper {
    private readonly mongoResultModel;
    private readonly rabbitMQService;
    constructor(mongoResultModel: Model<MongoResult>, rabbitMQService: RabbitMQService);
    gameName: string;
    getUrl(): string;
    scrape(browser: puppeteer.Browser): Promise<Document[]>;
}
