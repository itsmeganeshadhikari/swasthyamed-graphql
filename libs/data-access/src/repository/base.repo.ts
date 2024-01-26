import { Injectable } from '@nestjs/common';
import {
  ObjectId,
  Model,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  PipelineStage,
  AnyKeys,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

@Injectable()
export class BaseRepo<T> {
  private _model: Model<T>;
  constructor(_model) {
    this._model = _model;
  }

  async create(doc: AnyKeys<T> | T): Promise<T> {
    return this._model.create(doc);
  }
  async createMany(doc: T): Promise<any> {
    return await this._model.insertMany(doc);
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null,
  ): Promise<T> {
    return this._model.findOne(filter, projection, options);
  }

  async findById(
    id: string,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null,
  ): Promise<T> {
    return this._model.findById(id, projection, options);
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<T[]> {
    return this._model.find(filter, projection, options);
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T> | null | any,
  ) {
    return this._model.updateOne(filter, update, options);
  }

  async updateMany(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T> | any,
  ) {
    return this._model.updateMany(filter, update, options);
  }

  async updateById(
    id: ObjectId | any,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions<T>,
  ) {
    return this._model.findByIdAndUpdate(id, update, options);
  }

  async deleteOne(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T> | any,
  ): Promise<any> {
    return this._model.deleteOne(filter, options);
  }

  async deleteById(id?: ObjectId | any, options?: QueryOptions<T>) {
    return this._model.findByIdAndDelete(id, options);
  }

  async deleteMany(filter?: FilterQuery<T>, options?: QueryOptions<T> | any) {
    return this._model.deleteMany(filter, options);
  }

  async aggregate(stages: PipelineStage[]) {
    return this._model.aggregate(stages);
  }

  async aggregatePaginate(
    stages: PipelineStage[],
    paginationOptions: { skip: number; limit: number },
    sort: any = null,
  ) {
    let { skip, limit } = paginationOptions;

    if (!sort) {
      stages.push({
        $facet: {
          pagination: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      });
    } else {
      stages.push({
        $facet: {
          pagination: [{ $count: 'total' }],
          data: [
            { $skip: skip },
            { $limit: limit },
            { $sort: { [sort.orderBy]: sort.order === 'asc' ? 1 : -1 } },
          ],
        },
      });
    }

    const aggregationResult = await this._model.aggregate(stages);

    const total = aggregationResult[0].pagination[0]
      ? aggregationResult[0].pagination[0].total
      : 0;
    const hasNextPage = total - (skip + limit) > 0 ? true : false;
    return {
      data: aggregationResult[0].data,
      pagination: {
        total: total,
        hasNextPage,
      },
    };
  }
}
