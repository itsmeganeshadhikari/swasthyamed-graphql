import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from './order.schema';

export type ProductDocument = HydratedDocument<Product>;

class ImageType {
  @Prop()
  public_id: string;

  @Prop()
  url: string;
}

class CategoryType {
  @Prop()
  category: string;

  @Prop()
  subcategory: string;
}


@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
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
  category: CategoryType;

  @Prop()
  quantity: number

  @Prop()
  regularPrice: number

  @Prop()
  salePrice: number;

  @Prop()
  offerPrice: number;

  @Prop({ type: () => [ImageType] })
  image: [ImageType]

  @Prop({ default: 20 })
  rating: number;

  @Prop({ default: true })
  stock: boolean

  @Prop()
  productImagePreview: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;
}

export const productSchema = SchemaFactory.createForClass(Product);
productSchema.index({ productName: 1, "category.category": 1, "category.subcategory": 1 });
