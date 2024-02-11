import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class Image {
    @Field()
    public_id: string;
    @Field()
    url: string;
}


@ObjectType()
class Transaction {
    @Field()
    _id: string;

    @Field(() => Image)
    image: Image

    @Field()
    user: string;
}

@ObjectType()
export class TransactionResponse extends BaseResponse {
    @Field(() => [Transaction], { nullable: true })
    transactions?: [Transaction]

    @Field(() => Transaction, { nullable: true })
    transaction?: Transaction
}

