import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { AbstractGameScraper } from './strategies/abstract-game.scrapper';
export declare class ScrappingService implements OnModuleInit, OnModuleDestroy {
    private readonly scrapers;
    private readonly logger;
    private browser;
    private intervalId;
    constructor(scrapers: AbstractGameScraper[]);
    onModuleInit(): Promise<void>;
    runTask(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
