import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import {
  UserTokenMeta,
  UserTokenMetaDocument,
} from '../schema/user-token-meta.schema';

@Injectable()
export class UserTokenMetaRepository extends BaseRepository {
  constructor(
    @InjectModel(UserTokenMeta.name)
    private userTokenMetaModel: Model<UserTokenMetaDocument>,
  ) {
    super(userTokenMetaModel);
  }
}
