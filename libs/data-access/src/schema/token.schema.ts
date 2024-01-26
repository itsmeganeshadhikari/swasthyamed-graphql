import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type EmailTokenDocument = EmailToken & mongoose.Document;

@Schema({ timestamps: true })
export class EmailToken {
  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ default: 'resetToken' })
  type: string;

  @Prop({ required: true, default: Date.now() + 3600 })
  expiresIn: Date;
}

export const emailTokenSchema = SchemaFactory.createForClass(EmailToken);
