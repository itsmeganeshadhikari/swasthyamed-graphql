import {
  Injectable,
} from '@nestjs/common';
import { ProductRepository } from 'libs/data-access/src/repository/product.repository';
import { CreateProductDTO } from '../dto/input/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(input: CreateProductDTO) {
    return await this.productRepository.create(input);
  }

  async getAllProducts() {
    return  await this.productRepository.getAllProducts();
  }

  async getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }
}
