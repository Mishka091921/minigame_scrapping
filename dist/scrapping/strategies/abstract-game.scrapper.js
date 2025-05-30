"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameScraper = void 0;
class AbstractGameScraper {
    async openPage(browser, url) {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        return page;
    }
}
exports.AbstractGameScraper = AbstractGameScraper;
//# sourceMappingURL=abstract-game.scrapper.js.map