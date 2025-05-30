import { Document } from 'mongoose';
export type MongoResultDocument = MongoResult & Document;
export declare class MongoResult {
    date: string;
    round_id: string;
    result: string;
    game_name: string;
}
export declare const MongoResultSchema: import("mongoose").Schema<MongoResult, import("mongoose").Model<MongoResult, any, any, any, Document<unknown, any, MongoResult, any> & MongoResult & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MongoResult, Document<unknown, {}, import("mongoose").FlatRecord<MongoResult>, {}> & import("mongoose").FlatRecord<MongoResult> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
