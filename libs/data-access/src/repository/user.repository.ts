import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersRepository extends BaseRepository {
  projection;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);

    /* build projection */
    this.projection = {
      _id: 1,
      authProvider: 1,
      authProviderId: 1,
      firstName: 1,
      lastName: 1,
      address: 1,
      status: 1,
      bio: 1,
      lastLoggedInAt: 1,
      updatedAt: 1,
      createdAt: 1,
    };
  }

  async getAllUsers(filter, meta) {
    const stages = [...filter];

    /* create pipeline */
    stages.push({
      $project: this.projection,
    });

    return this.aggregatePaginate(stages, meta);
  }

  async getUser(filter = []) {
    const stages = [...filter];

    /* create pipeline */
    stages.push({
      $project: this.projection,
    });

    return this.aggregate(stages);
  }
}
