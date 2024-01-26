import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonials, TestimonialsDocument } from '../schema/testimonials';
import { BaseRepo } from './base.repo';

@Injectable()
export class TestimonialsRepository extends BaseRepo<TestimonialsDocument> {
  constructor(
    @InjectModel(Testimonials.name)
    private readonly model: Model<TestimonialsDocument>,
  ) {
    super(model);
  }

  async getTestimonialsList(filter = [], pageMeta) {
    let pipeline = [];
    if (filter) {
      pipeline = [...filter];
    }

    pipeline.push({
      $project: {
        _id: 1,
        text: 1,
        customer: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });

    return this.aggregatePaginate(pipeline, pageMeta);
  }
}
