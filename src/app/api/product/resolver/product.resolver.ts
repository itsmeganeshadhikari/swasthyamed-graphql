import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ProductResponse } from "../dto/response/product.response";
import { CreateProductDTO } from "../dto/input/create-product.dto";
import { ProductService } from "../service/product.service";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt.authguard";
import { Roles, RolesGuard } from "../../auth/guard/roles.guard";

@Resolver()
export class ProductResolver{
    constructor(
     private productService: ProductService
    ){
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

}