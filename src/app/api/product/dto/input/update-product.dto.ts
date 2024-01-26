import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductDTO } from './create-product.dto';

@InputType()
export class UpdateUserDTO extends PartialType(CreateProductDTO) {
  @Field({ nullable: true })
  password?: string;
}
