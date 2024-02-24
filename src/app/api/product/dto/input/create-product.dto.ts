import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class ImageType {
  @Field()
  image: string;
}

@InputType()
export class CreateProductDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  subDescription: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @Field()
  @IsString()
  @IsOptional()
  productSize: string;

  @Field()
  @IsString()
  @IsOptional()
  sku: string

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsOptional()
  @IsString()
  subcategory: string;

  @Field()
  @IsString()
  @IsOptional()
  productImagePreview: string

  @Field()
  @IsNotEmpty()
  quantity: number

  @Field()
  @IsNotEmpty()
  regularPrice: number

  @Field()
  @IsNotEmpty()
  salePrice: number;

  @Field()
  @IsNotEmpty()
  offerPrice: number;

  @Field(() => [String])
  productImage: [String]

  // @Field()
  // @IsOptional()
  // @IsEmpty()
  // rating: number;

  // @Field()
  // @IsOptional()
  // @IsEmpty()
  // stock: boolean
}
