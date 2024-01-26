import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PushNotificationTokenDocument = PushNotificationToken & Document;
type deviceType = 1 | 2;
@Schema({ timestamps: true })
export class PushNotificationToken {
  @Prop({ required: true, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;
  @Prop()
  deviceId: string;
  @Prop({ enum: [1, 2] })
  deviceType: deviceType;
  @Prop()
  token: string;
}

export const PushNotificationTokenSchema = SchemaFactory.createForClass(
  PushNotificationToken,
);
