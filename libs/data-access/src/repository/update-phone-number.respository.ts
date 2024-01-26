import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import {
  UpdatePhoneNumber,
  UpdatePhoneNumberDocument,
} from '../schema/update-phone.schema';

@Injectable()
export class UpdatePhoneNumberRepository extends BaseRepository {
  constructor(
    @InjectModel(UpdatePhoneNumber.name)
    private updatePhoneNumberModel: Model<UpdatePhoneNumberDocument>,
  ) {
    super(updatePhoneNumberModel);
  }
}
