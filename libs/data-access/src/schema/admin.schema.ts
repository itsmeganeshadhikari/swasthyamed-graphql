import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AdminDocument = Admin & mongoose.Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, enum: ['active', 'pending'], default: 'pending' })
  status: string;

  @Prop()
  phone: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);

adminSchema.index({ title: 'text', 'attributes.attribute_value': 'text' });

// console.log(adminSchema.indexes());
