import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field()
  transactionImage: string;

  @Field()
  user: string;

}
