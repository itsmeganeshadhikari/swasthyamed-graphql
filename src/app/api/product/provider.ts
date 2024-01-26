import { ProductRepository } from "libs/data-access/src/repository/product.repository";
import { ProductResolver } from "./resolver/product.resolver";
import { ProductService } from "./service/product.service";

export const providers = [
  ProductResolver,
  ProductService,
  ProductRepository,
];