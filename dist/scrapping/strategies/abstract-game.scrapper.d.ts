import * as puppeteer from 'puppeteer';
import { Document } from 'src/interface/document.interface';
export declare abstract class AbstractGameScraper {
    abstract gameName: string;
    abstract getUrl(): string;
    abstract scrape(browser: puppeteer.Browser): Promise<Document[]>;
    protected openPage(browser: puppeteer.Browser, url: string): Promise<puppeteer.Page>;
}
