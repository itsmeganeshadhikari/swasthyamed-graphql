import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';


export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address {
    @Prop({ required: true })
    name: string;

    @Prop()
    building: string;

    @Prop()
    street: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

    @Prop()
    destination: string;

    @Prop()
    post: string;

    @Prop()
    city: string;

    @Prop()
    isDefault: boolean

    @Prop()
    phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}


export const addressSchema = SchemaFactory.createForClass(Address);
