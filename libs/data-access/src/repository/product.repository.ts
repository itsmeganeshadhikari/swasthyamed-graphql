import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "./base.repository";
import { Product, ProductDocument } from "../schema/product.schema";
import { Model } from "mongoose";

export class ProductRepository extends BaseRepository {
    constructor(
        @InjectModel(Product.name) private readonly product: Model<ProductDocument>,
    ) {
    super(product);
  }

  async getAllProducts() {
    return await this.product.find()
  }

  async getProductById(id: string | any) {
    return this.product.findById({_id:id})
  }

}