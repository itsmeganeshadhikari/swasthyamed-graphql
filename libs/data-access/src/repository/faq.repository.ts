import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQ, FAQDocument } from '../schema/faq.schema';
import { BaseRepo } from './base.repo';

@Injectable()
export class FAQRepository extends BaseRepo<FAQDocument> {
  constructor(@InjectModel(FAQ.name) private readonly faq: Model<FAQDocument>) {
    super(faq);
  }

  async getAllFAQs(filter = [], pageMeta) {
    let pipeline = [];
    if (filter) {
      pipeline = [...filter];
    }

    pipeline.push({
      $project: {
        _id: 1,
        section: 1,
        description: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });

    return this.aggregatePaginate(pipeline, pageMeta);
  }

  async getFAQ(filter) {
    const pipeline = [...filter];

    /* build projection */
    pipeline.push({
      $project: {
        _id: 1,
        section: 1,
        description: 1,
        content: 1,
        updatedAt: 1,
        createdAt: 1,
      },
    });

    return this.faq.aggregate(pipeline);
  }
}
