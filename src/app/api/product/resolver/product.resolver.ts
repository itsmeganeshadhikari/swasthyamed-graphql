import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductResponse } from "../dto/response/product.response";
import { CreateProductDTO } from "../dto/input/create-product.dto";
import { ProductService } from "../service/product.service";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt.authguard";
import { Roles, RolesGuard } from "../../auth/guard/roles.guard";
import lang from '../../constants/language';
import { log } from "console";

@Resolver()
export class ProductResolver {
  constructor(
    private productService: ProductService
  ) {
  }

  @Mutation(() => ProductResponse, { name: "product" })
  @UseGuards(JwtAuthGuard, new RolesGuard(Roles.ADMIN))
  async createProduct(@Args('input') input: CreateProductDTO) {
    try {
      const product = await this.productService.createProduct(input);
      return {
        message: 'product created successfully',
        product,
      };
    } catch (error) {
      throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => ProductResponse, { name: "productlist" })
  async getProductsList() {
    try {
      const products = await this.productService.getAllProducts();
      return {
        message: 'product list',
        products,
      };
    } catch (error) {
      throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => ProductResponse, { name: "getProduct" })
  async getProductById(@Args('input') input: string) {
    try {
      const product = await this.productService.getProductById(input);
      return {
        message: 'products',
        product,
      };
    } catch (error) {
      throw new HttpException("Error on fetch", HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => ProductResponse, { name: "productName" })
  async getProductByName(@Args('input') input: string) {
    try {
      const products = await this.productService.getProductByName(input);
      return {
        message: 'products',
        products,
      };
    } catch (error) {
      throw new HttpException("Error on fetch", HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => ProductResponse)
  async deleteProduct(@Args('id') id: string) {
    try {
      await this.productService.deleteProduct(id);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new HttpException(lang.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
    }
  }
}