import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Customer {
  id: string;
  comment: string;
  image: string;
  name: string;
  location: string;
}

export type TestimonialsDocument = Testimonials & Document;

@Schema({ timestamps: true })
export class Testimonials {
  @Prop({ unique: true })
  text: string;
  @Prop(() => Customer)
  customer: [Customer];
}

export const testimonialsSchema = SchemaFactory.createForClass(Testimonials);
