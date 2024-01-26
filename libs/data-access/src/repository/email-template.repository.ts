import { InjectModel } from '@nestjs/mongoose';
import {
  EmailTemplate,
  EmailTemplateDocument,
} from '../schema/email-template.schema';
import { BaseRepo } from './base.repo';

export class EmailTemplateRepository extends BaseRepo<EmailTemplateDocument> {
  constructor(
    @InjectModel(EmailTemplate.name) private model: EmailTemplateDocument,
  ) {
    super(model);
  }

  async getAllTemplates(filter = [], pageMeta) {
    let pipeline = [];
    if (filter) {
      pipeline = [...filter];
    }

    pipeline.push({
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        subject: 1,
        status: 1,
        body: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    });

    return this.aggregatePaginate(pipeline, pageMeta);
  }
}
