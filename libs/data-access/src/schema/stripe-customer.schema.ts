import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StripeCustomerDocument = StripeCustomer & Document;

@Schema({ timestamps: true })
export class StripeCustomer {
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  customerId: string;
}

export const StripeCustomerSchema =
  SchemaFactory.createForClass(StripeCustomer);
