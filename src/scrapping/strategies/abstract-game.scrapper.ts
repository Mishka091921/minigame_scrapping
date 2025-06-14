import * as puppeteer from 'puppeteer';
import { Document } from 'src/interface/document.interface';

export abstract class AbstractGameScraper {
  abstract gameName: string;
  abstract getUrl(): string;
  abstract scrape(browser: puppeteer.Browser): Promise<Document[]>;

  protected async openPage(browser: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
    const page = await browser.newPage();

    // Set individual page timeout to match protocolTimeout
    await page.setDefaultNavigationTimeout(60000);

    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000, // Make sure this is not too short
      });
    } catch (error) {
      console.error(`Failed to open page: ${url}`, error);
      throw error;
    }

    return page;
  }
}
