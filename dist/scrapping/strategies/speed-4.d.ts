import * as puppeteer from 'puppeteer';
import { AbstractGameScraper } from './abstract-game.scrapper';
import { Document } from 'src/interface/document.interface';
import { MongoResult } from 'src/schema/mongo-result.schema';
import { Model } from 'mongoose';
export declare class Speed4 extends AbstractGameScraper {
    private readonly mongoResultModel;
    constructor(mongoResultModel: Model<MongoResult>);
    gameName: string;
    getUrl(): string;
    scrape(browser: puppeteer.Browser): Promise<Document[]>;
}
