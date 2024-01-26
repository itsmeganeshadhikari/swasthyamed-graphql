import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from './base.repo';
import { OTPRequest, OTPRequestDocument } from '../schema/otp.request.schema';

@Injectable()
export class OTPRequestRepository extends BaseRepo<OTPRequestDocument> {
  constructor(
    @InjectModel(OTPRequest.name)
    private otpRequestModel: Model<OTPRequestDocument>,
  ) {
    super(otpRequestModel);
  }
}
