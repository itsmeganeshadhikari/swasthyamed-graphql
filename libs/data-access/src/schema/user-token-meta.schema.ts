import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type UserTokenMetaDocument = UserTokenMeta & mongoose.Document;
type grant = 'all' | 'set_password' | 'refresh_token';
type authType =
  | 'email_password'
  | 'phone_otp'
  | 'email_otp'
  | 'facebook'
  | 'google'
  | 'apple';

type tokenType = 'access_token' | 'refresh_token';
@Schema({ timestamps: true })
export class UserTokenMeta {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: String })
  deviceId: string;

  @Prop({ enum: ['access_token', 'refresh_token'] })
  tokenType: tokenType;

  /**
   * Type of login
   * facebook, google, email_password, email_otp
   */
  @Prop({
    enum: [
      'email_password',
      'email_otp',
      'phone_otp',
      'facebook',
      'google',
      'apple',
    ],
  })
  authType: authType;

  @Prop({ required: true })
  jti: string;

  /**
   * Type of token eg for authorization of every api, authorization for set_password only or refresh token
   *
   */
  @Prop({
    required: true,
    enum: ['all', 'set_password', 'refresh_token'],
    default: 'all',
  })
  grant: grant;

  @Prop({ type: Date })
  expiresAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

export const UserTokenMetaSchema = SchemaFactory.createForClass(UserTokenMeta);
