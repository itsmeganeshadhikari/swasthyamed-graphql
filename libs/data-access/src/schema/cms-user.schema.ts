import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CMSUserDocument = mongoose.Document & CMSUser;

@Schema()
export class CMSUser {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  // @Prop({ required: true, ref: 'Admin', type: mongoose.Schema.Types.ObjectId })
  // createdBy: mongoose.Schema.Types.ObjectId;
}

export const CMSUserSchema = SchemaFactory.createForClass(CMSUser);
