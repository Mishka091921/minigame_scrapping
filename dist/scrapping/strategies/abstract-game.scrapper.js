"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameScraper = void 0;
class AbstractGameScraper {
    async openPage(browser, url) {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        try {
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 60000,
            });
        }
        catch (error) {
            console.error(`Failed to open page: ${url}`, error);
            throw error;
        }
        return page;
    }
}
exports.AbstractGameScraper = AbstractGameScraper;
//# sourceMappingURL=abstract-game.scrapper.js.map