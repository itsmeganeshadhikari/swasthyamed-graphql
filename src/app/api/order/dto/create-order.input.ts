import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  user: string;

  @Field(() => [String])
  product: [String]

  @Field()
  method: string;

  @Field()
  type: string;

  @Field()
  address: string;

  @Field()
  total: number;

  @Field()
  discount: number;

  @Field()
  subTotal: number;
}

