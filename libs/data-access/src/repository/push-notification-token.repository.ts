import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import {
  PushNotificationToken,
  PushNotificationTokenDocument,
} from '../schema/push-notification-token.schema';

@Injectable()
export class PushNotificationTokenRepository extends BaseRepository {
  constructor(
    @InjectModel(PushNotificationToken.name)
    private pushNotificationTokenModel: Model<PushNotificationTokenDocument>,
  ) {
    super(pushNotificationTokenModel);
  }
}
