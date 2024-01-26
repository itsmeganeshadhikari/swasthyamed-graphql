import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OTPRequestDocument = OTPRequest & Document;
/**
 * This schema holds user afer sent otp request is made to server and otp is not verified yet
 */
enum requestedFor {
  app_login = 'app_login',
  cms_login = 'cms_login',
}

@Schema({ timestamps: true })
export class OTPRequest {
  /**
   * Id of the device requesting otp
   */
  @Prop({ required: true })
  deviceId: string;
  /**
   * email for user
   */
  @Prop({ required: false })
  email: string;
  /**
   * phone number for user
   */
  @Prop({ required: false })
  phoneNumber: string;
  /**
   * Otp requested for eg
   */
  @Prop({ required: true })
  requestedFor: requestedFor;

  @Prop({ required: true, index: true })
  verificationCode: string;

  @Prop({ default: null })
  expiresAt: Date;

  @Prop({ default: 0 })
  expiresBy: number;
}

export const OTPRequestSchema = SchemaFactory.createForClass(OTPRequest);
