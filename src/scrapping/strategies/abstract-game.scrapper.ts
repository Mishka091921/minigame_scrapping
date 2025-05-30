import * as puppeteer from 'puppeteer';
import { Document } from 'src/interface/document.interface';

export abstract class AbstractGameScraper {
  abstract gameName: string;
  abstract getUrl(): string;
  abstract scrape(browser: puppeteer.Browser): Promise<Document[]>;

  protected async openPage(browser: puppeteer.Browser, url: string) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    return page;
  }
}