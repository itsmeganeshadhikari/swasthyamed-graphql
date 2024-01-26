import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Pagination {
  @Field()
  total: number;

  @Field()
  hasNextPage: boolean;
}

@ObjectType()
export class BaseResponse {
  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  pagination?: Pagination;
}
