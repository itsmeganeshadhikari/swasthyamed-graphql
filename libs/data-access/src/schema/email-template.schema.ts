import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type EmailTemplateDocument = EmailTemplate & Document;

@Schema({ timestamps: true })
export class EmailTemplate {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  slug: string;
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true, enum: [Status.ACTIVE, Status.INACTIVE] })
  status: string;
  @Prop({ required: true })
  body: string;
}

export const emailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
