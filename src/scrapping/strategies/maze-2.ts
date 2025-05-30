import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { AbstractGameScraper } from './abstract-game.scrapper';
import { Document } from 'src/interface/document.interface';
import { MongoResult, MongoResultDocument } from 'src/schema/mongo-result.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class Maze2 extends AbstractGameScraper {

  constructor(
    @InjectModel (MongoResult.name)
    private readonly mongoResultModel: Model<MongoResult>,
    private readonly rabbitMQService: RabbitMQService

  ) {
      super();
  }
  gameName = 'maze_2';
  getUrl(): string {
    return 'https://runningball.co/result?channel=CH2&version=2';
  }
  async scrape(browser: puppeteer.Browser): Promise<Document[]> {
    const page = await this.openPage(browser, this.getUrl());
    try {
      await page.waitForSelector('div.ant-table-content table tbody.ant-table-tbody', { timeout: 5000 });
      const data = await page.evaluate(() => {
        const rows = document.querySelectorAll('div.ant-table-content table tbody.ant-table-tbody tr');
        const result: any[] = [];
        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          const cellValues: any = {};
          cells.forEach((cell, index) => {
            cellValues[index] = index === 1
              ? Array.from(cell.querySelectorAll('img')).map(img => img.getAttribute('title') || '').join(' | ')
              : cell.innerText.trim();
          });
          result.push(cellValues);
        });
        return result;
      });

      const docs: MongoResult[] = data
        .filter(row => row[2])
        .map(row => ({
          round_id: row[2],
          date: row[0],
          result: row[1],
          game_name: this.gameName,
        }));

        for (const doc of docs) {
          try {
            // Upsert the document in MongoDB
            const result = await this.mongoResultModel.updateOne(
              { round_id: doc.round_id, game_name: this.gameName, result: doc.result },
              { $setOnInsert: doc},
              { upsert: true }
            );
            if (result.upsertedId) {
               await this.rabbitMQService.publishToQueue({
                  event: 'result',
                  data: result,
                });
            }
          } catch (err) {
            console.log("error")
          }
        }
      return docs;
    } finally {
      await page.close();
    }
  }
}
