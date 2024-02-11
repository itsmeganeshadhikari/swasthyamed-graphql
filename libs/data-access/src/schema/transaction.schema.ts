import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

class Image {
    @Prop()
    public_id: string;

    @Prop()
    url: string;
}


@Schema({ timestamps: true })
export class Transaction {

    @Prop({ type: () => Image })
    image: Image

    @Prop()
    transactionImagePreview: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);