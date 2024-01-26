import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../schema/admin.schema';
import { BaseRepository } from './base.repository';

type PageMeta = {
  limit: number;
  skip: number;
};

type Sort = {
  order: string;
  orderBy: string;
};

@Injectable()
export class AdminRepository extends BaseRepository {
  constructor(@InjectModel(Admin.name) private Admin: Model<AdminDocument>) {
    super(Admin);
  }

  async getAllAdmins(filter = [], pageMeta: PageMeta) {
    let pipeline = [...filter];

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        status: 1,
        role: 1,
      },
    });

    return this.aggregatePaginate(pipeline, pageMeta);
  }
}
