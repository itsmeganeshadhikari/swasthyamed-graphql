import { Product, productSchema } from "libs/data-access/src/schema/product.schema";

export const mongooseModels = [
  { name: Product.name, schema: productSchema },
];
