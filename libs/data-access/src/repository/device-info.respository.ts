import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { DeviceInfo, DeviceInfoDocument } from '../schema/device-info.schema';

@Injectable()
export class DeviceInfoRepository extends BaseRepository {
  constructor(
    @InjectModel(DeviceInfo.name)
    private deviceInfoModel: Model<DeviceInfoDocument>,
  ) {
    super(deviceInfoModel);
  }
}
