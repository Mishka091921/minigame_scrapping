"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappingModule = void 0;
const common_1 = require("@nestjs/common");
const maze_2_1 = require("./strategies/maze-2");
const speed_4_1 = require("./strategies/speed-4");
const scrapping_service_1 = require("./scrapping.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_result_schema_1 = require("../schema/mongo-result.schema");
const speed_6_1 = require("./strategies/speed-6");
const space_8_1 = require("./strategies/space-8");
const rabbitmq_module_1 = require("../rabbitmq/rabbitmq.module");
let ScrappingModule = class ScrappingModule {
};
exports.ScrappingModule = ScrappingModule;
exports.ScrappingModule = ScrappingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mongo_result_schema_1.MongoResult.name, schema: mongo_result_schema_1.MongoResultSchema },
            ]),
            rabbitmq_module_1.RabbitMQModule
        ],
        providers: [
            scrapping_service_1.ScrappingService,
            maze_2_1.Maze2,
            speed_4_1.Speed4,
            speed_6_1.Speed6,
            space_8_1.Space8,
            {
                provide: 'GameScraperStrategies',
                useFactory: (maze2, speed4, speed6, space8) => [maze2, speed4, speed6, space8],
                inject: [maze_2_1.Maze2, speed_4_1.Speed4, speed_6_1.Speed6, space_8_1.Space8],
            }
        ]
    })
], ScrappingModule);
//# sourceMappingURL=scrapping.module.js.map