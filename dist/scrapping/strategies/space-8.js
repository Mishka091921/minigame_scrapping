"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space8 = void 0;
const common_1 = require("@nestjs/common");
const abstract_game_scrapper_1 = require("./abstract-game.scrapper");
const mongo_result_schema_1 = require("../../schema/mongo-result.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Space8 = class Space8 extends abstract_game_scrapper_1.AbstractGameScraper {
    constructor(mongoResultModel) {
        super();
        this.mongoResultModel = mongoResultModel;
        this.gameName = 'space_8';
    }
    getUrl() {
        return 'https://runningball.co/result?channel=CH4&version=2';
    }
    async scrape(browser) {
        const page = await this.openPage(browser, this.getUrl());
        try {
            await page.waitForSelector('div.ant-table-content table tbody.ant-table-tbody', { timeout: 5000 });
            const data = await page.evaluate(() => {
                const rows = document.querySelectorAll('div.ant-table-content table tbody.ant-table-tbody tr');
                const result = [];
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    const cellValues = {};
                    cells.forEach((cell, index) => {
                        cellValues[index] = index === 1
                            ? Array.from(cell.querySelectorAll('img')).map(img => img.getAttribute('title') || '').join(' | ')
                            : cell.innerText.trim();
                    });
                    result.push(cellValues);
                });
                return result;
            });
            const docs = data
                .filter(row => row[2])
                .map(row => ({
                round_id: row[2],
                date: row[0],
                result: row[1],
                game_name: this.gameName,
            }));
            for (const doc of docs) {
            }
            return docs;
        }
        finally {
            await page.close();
        }
    }
};
exports.Space8 = Space8;
exports.Space8 = Space8 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mongo_result_schema_1.MongoResult.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], Space8);
//# sourceMappingURL=space-8.js.map