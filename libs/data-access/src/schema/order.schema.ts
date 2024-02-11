import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';
import { Address } from './address.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product: Product[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    method: string;

    @Prop()
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    address: Address;

    @Prop()
    total: number;

    @Prop()
    discount: number;

    @Prop()
    subTotal: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);