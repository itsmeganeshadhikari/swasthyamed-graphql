import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PageDocument = Page & mongoose.Document;

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({
    required: true,
    default: 'inactive',
    enum: [Status.ACTIVE, Status.INACTIVE],
  })
  status: string;
  @Prop({ required: true, unique: true })
  slug: string;
}

export const pageSchema = SchemaFactory.createForClass(Page);

pageSchema.index({ pageType: 'text' });
