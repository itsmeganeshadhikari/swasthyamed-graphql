import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HomePageTemplate,
  HomePageTemplateDocument,
} from '../schema/homePage-template.schema';
import { BaseRepo } from './base.repo';

export class HomePageTemplateRepository extends BaseRepo<HomePageTemplateDocument> {
  constructor(
    @InjectModel(HomePageTemplate.name)
    private template: Model<HomePageTemplateDocument>,
  ) {
    super(template);
  }

  async getAllHomePageListings(filter = [], pageMeta) {
    let pipeline = [];
    if (filter) {
      pipeline = [...filter];
    }

    pipeline.push({
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        status: 1,
        body: 1,
        banner: 1,
        homeBanner: 1,
        featuredProduct: 1,
        imageColumn: 1,
        steps: 1,
        faq: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });

    return this.aggregatePaginate(pipeline, pageMeta);
  }
}
