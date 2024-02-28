import {
  BadRequestException,
  Injectable, NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'libs/data-access/src/repository/product.repository';
import { CreateProductDTO } from '../dto/input/create-product.dto';
import cloudinary from '../../cloudinary/cloudinary';
import lang from '../../constants/language';
import { UpdateProductDTO } from '../dto/input/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) { }

  async createProduct(input: CreateProductDTO) {
    console.log(input);

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
      subcategory,
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
        category: { category, subcategory },
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
    if (["baby", "surgical", "nutrition", "medicine"].includes(productName)) {
      return await this.productRepository.find({ "category.category": { $regex: productName, $options: "i" } })
    }
    if (["milk", "daiper", "skin", "supplement"].includes(productName)) {
      return await this.productRepository.find({ "category.subcategory": { $regex: productName, $options: "i" } })
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

  async updateProduct(id: string, data: UpdateProductDTO) {
    // find the user if exists;
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(lang.INVALID_PRODUCT_ID);
    }

    const updateProduct = await this.productRepository.updateById(id, data, {
      new: true,
    });
    if (!updateProduct) {
      throw new BadRequestException(lang.INVALID_PRODUCT_ID);
    }
    return updateProduct;

  }
}
