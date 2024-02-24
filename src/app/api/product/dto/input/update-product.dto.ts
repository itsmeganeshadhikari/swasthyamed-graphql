import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductDTO } from './create-product.dto';

@InputType()
export class UpdateProductDTO extends PartialType(CreateProductDTO) {
}
