import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CMSUser, CMSUserDocument } from '../schema/cms-user.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class CMSUserRepository extends BaseRepository {
  constructor(
    @InjectModel(CMSUser.name) private readonly user: Model<CMSUserDocument>,
  ) {
    super(user);
  }

  async getAllUsers(filter, meta) {
    const stages = [...filter];

    /* create pipeline */
    stages.push(
      {
        $lookup: {
          from: 'admins',
          let: { adminId: '$createdBy' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$adminId'],
                },
              },
            },
          ],
          as: 'admin',
        },
      },
      {
        $unwind: '$admin',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          bio: 1,
          admin: 1,
        },
      },
    );

    return this.aggregatePaginate(stages, meta);
  }

  async getUser(filter = []) {
    const stages = [...filter];

    /* create pipeline */
    stages.push(
      {
        $lookup: {
          from: 'admins',
          let: { adminId: '$createdBy' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$adminId'],
                },
              },
            },
          ],
          as: 'admin',
        },
      },
      {
        $unwind: '$admin',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          bio: 1,
          admin: 1,
        },
      },
    );

    return this.user.aggregate(stages);
  }
}
