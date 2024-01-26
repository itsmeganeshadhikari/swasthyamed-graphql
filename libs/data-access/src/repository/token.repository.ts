import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailToken, EmailTokenDocument } from '../schema/token.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class TokenRepository extends BaseRepository {
  constructor(
    @InjectModel(EmailToken.name) emailToken: Model<EmailTokenDocument>,
  ) {
    super(emailToken);
  }
}
