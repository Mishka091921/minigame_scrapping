import { Injectable, Logger, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { AbstractGameScraper } from './strategies/abstract-game.scrapper';
import { Document } from 'src/interface/document.interface';

@Injectable()
export class ScrappingService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ScrappingService.name);
  private browser: puppeteer.Browser;
  private intervalId: NodeJS.Timeout;

  constructor(
    @Inject('GameScraperStrategies')
    private readonly scrapers: AbstractGameScraper[]
  ) {}

  async onModuleInit() {
    this.browser = await puppeteer.launch({ headless: true });
    this.logger.log('Browser launched');
    await this.runTask();

    this.intervalId = setInterval(() => {
      this.runTask();
    }, 5000);
  }

  async runTask() {
    this.logger.log('Running scraping task');

    for (const scraper of this.scrapers) {
      try {

        console.log(scraper,'scrapp')
        const docs: Document[] = await scraper.scrape(this.browser);
        if (docs.length === 0) {
          this.logger.warn(`No data scraped for game: ${scraper.gameName}`);
          continue;
        }
        this.logger.log(`Scraped ${docs.length} documents from ${scraper.gameName}`);
        // Save to MongoDB here (use injected Mongo service)
      } catch (error) {
        this.logger.error(`Error scraping ${scraper.gameName}:`, error);
      }
    }
  }

  async onModuleDestroy() {
    clearInterval(this.intervalId);
    if (this.browser) await this.browser.close();
    this.logger.log('Browser closed');
  }
}
