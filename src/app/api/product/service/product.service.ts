import {
  Injectable,
} from '@nestjs/common';
import { ProductRepository } from 'libs/data-access/src/repository/product.repository';
import { CreateProductDTO } from '../dto/input/create-product.dto';
import cloudinary from '../../cloudinary/cloudinary';
@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  async createProduct(input: CreateProductDTO) {
    const {
      productName,
      description,
      productImagePreview,
      subDescription,
      productImage,
      productCode,
      productSize,
      sku,
      category,
      quantity,
      regularPrice,
      salePrice,
      offerPrice,
    } = input;
    // console.log(input);
    try {
      const images = []
      await Promise.all(productImage.map(async (image) => {
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "products",
        })
        console.log(myCloud);
        images.push({ public_id: myCloud?.public_id, url: myCloud?.url })
      }))
      const product = await this.productRepository.create({
        productName,
        description,
        subDescription,
        productCode,
        productSize,
        sku,
        category,
        quantity,
        regularPrice,
        salePrice,
        productImagePreview,
        offerPrice,
        image: images
      });
      return product;
    } catch (error) {
    }
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }
}
