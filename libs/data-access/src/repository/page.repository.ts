import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from '../schema/page.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class PageRepository extends BaseRepository {
  constructor(
    @InjectModel(Page.name) private readonly page: Model<PageDocument>,
  ) {
    super(page);
  }

  async getAllPages(filter, sort, meta) {
    const stages = [];
    if (filter) {
      stages.push(filter[0]);
    }

    /* projection */
    stages.push({
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        status: 1,
        content: 1,
        updatedAt: 1,
      },
    });

    if (sort?.orderBy && sort?.order) {
      stages.push({ $sort: { [sort.orderBy]: sort.order === 'asc' ? 1 : -1 } });
    }

    // console.log(JSON.stringify(stages));
    return this.aggregatePaginate(stages, meta);
  }
}
