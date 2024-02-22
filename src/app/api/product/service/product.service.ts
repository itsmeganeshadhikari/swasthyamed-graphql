import {
  Injectable, NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'libs/data-access/src/repository/product.repository';
import { CreateProductDTO } from '../dto/input/create-product.dto';
import cloudinary from '../../cloudinary/cloudinary';
import lang from '../../constants/language';

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

    try {
      const images = []
      await Promise.all(productImage.map(async (image) => {
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "swasthya-med",
        })
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
      console.log(error);
    }
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: string) {
    return await this.productRepository.getProductById(id);
  }

  async getProductByName(productName: string) {
    if (["baby", "skin"].includes(productName)) {
      return await this.productRepository.find({ category: { $regex: productName, $options: "i" } })
    }
    return await this.productRepository.find({ productName: { $regex: productName, $options: "i" } })
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(lang.INVALID_USER_ID);
    }
    await this.productRepository.deleteById(id);
    return true;
  }
}
