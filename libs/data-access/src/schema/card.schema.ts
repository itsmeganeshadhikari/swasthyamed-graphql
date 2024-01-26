import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CardDocument = Card & Document;
type status = 'ready_to_delete';
@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  cardId: string;
  @Prop({ required: true })
  brand: string;
  @Prop()
  country: string;
  @Prop()
  exp_month: number;
  @Prop()
  exp_year: number;
  @Prop()
  fingerprint: string;
  @Prop()
  funding: string;
  @Prop()
  last4: string;
  @Prop({ type: {} })
  metadata: object;
  @Prop()
  name: string;
  @Prop()
  is_default_source: boolean;
  /**
   * Prepare card for delete
   * if card has ready to delete verify it if it exists in stripe
   * it card does not exists in stripe remove
   */
  @Prop({ enum: ['ready_to_delete'] })
  status: status;
}

export const CardSchema = SchemaFactory.createForClass(Card);
