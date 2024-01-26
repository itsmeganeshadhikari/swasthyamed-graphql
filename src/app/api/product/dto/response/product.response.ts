import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class Product {
  @Field()
  _id: string;
  @Field()
  productName: string;
  @Field()
  description: string;
}

@ObjectType()
export class ProductResponse extends BaseResponse {
  @Field(() => [Product], { nullable: true })
  products?: [Product];

  @Field(() => Product, { nullable: true })
  product?: Product;
}

