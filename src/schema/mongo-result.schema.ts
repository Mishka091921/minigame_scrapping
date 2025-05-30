import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoResultDocument = MongoResult & Document;

@Schema({ timestamps: true })  // Adds createdAt and updatedAt automatically
export class MongoResult {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  round_id: string;

  @Prop({ required: true })
  result: string;

  @Prop({ required: true })
  game_name: string;

  // createdAt and updatedAt will be added automatically by Mongoose
}

export const MongoResultSchema = SchemaFactory.createForClass(MongoResult);

// Compound unique index on round_id + game_name
MongoResultSchema.index({ round_id: 1, game_name: 1 }, { unique: true });

// TTL index on createdAt field — documents expire after 48 hours (172800 seconds)
MongoResultSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

