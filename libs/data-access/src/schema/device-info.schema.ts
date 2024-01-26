import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DeviceInfoDocument = DeviceInfo & Document;
type deviceType = 1 | 2;
@Schema({ timestamps: true })
export class DeviceInfo {
  @Prop({ required: true, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;
  @Prop()
  deviceId: string;
  @Prop({ enum: [1, 2] })
  deviceType: deviceType;
  @Prop()
  deviceName: string;
}

export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);
