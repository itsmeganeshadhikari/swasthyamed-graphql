import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './address.schema';
import { Order } from './order.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({
    required: true,
    enum: ['admin', 'superAdmin', 'editor', 'user'],
    default: 'user',
  })
  role: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;
}
export const UserSchema = SchemaFactory.createForClass(User);
