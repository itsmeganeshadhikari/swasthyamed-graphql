import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class ImageType {
  @Field()
  public_id: string;

  @Field()
  url: string;
}

@ObjectType()
class CategoryType {
  @Field()
  category: string;

  @Field()
  subcategory: string;
}



@ObjectType()
class Product {
  @Field()
  _id: string;

  @Field()
  productName: string;

  @Field()
  subDescription: string;

  @Field()
  description: string;

  @Field()
  productCode: string;

  @Field()
  productSize: string;

  @Field()
  sku: string;

  @Field()
  quantity: number

  @Field()
  regularPrice: number

  @Field()
  salePrice: number;

  @Field()
  offerPrice: number;

  @Field(() => [ImageType])
  image: [ImageType]

  @Field(() => CategoryType)
  category: CategoryType


  @Field({ defaultValue: 20 })
  rating: number;

  @Field({ defaultValue: true })
  stock: boolean
}

@ObjectType()
export class ProductResponse extends BaseResponse {
  @Field(() => [Product], { nullable: true })
  products?: [Product]

  @Field(() => Product, { nullable: true })
  product?: Product
}

