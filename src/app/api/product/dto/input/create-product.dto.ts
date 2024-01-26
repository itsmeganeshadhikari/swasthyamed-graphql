import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

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
  @IsNotEmpty()
  productSize: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  sku: string

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

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

  @Field()
  @IsString()
  @IsNotEmpty()
  imageUrl: string
  
  @Field()
  @IsNotEmpty()
  raing: number;

  @Field()
  @IsNotEmpty()
  stock: boolean
}
