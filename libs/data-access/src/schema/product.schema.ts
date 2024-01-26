import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({required: true})
  productName: string;

  @Prop()
  subDescription: string;

  @Prop()
  description: string;
  
  @Prop()
  productCode: string;

  @Prop()
  productSize: string;

  @Prop()
  sku: string

  @Prop()
  category: string;

  @Prop()
  quantity: number

  @Prop()
  regularPrice: number

  @Prop()
  salePrice: number;

  @Prop()
  offerPrice: number;

  @Prop()
  imageUrl: string
  
  @Prop({default: 20})
  raing: number;

  @Prop({default: true})
  stock: boolean
}

export const productSchema = SchemaFactory.createForClass(Product);