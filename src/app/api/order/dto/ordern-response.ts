import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class OrderN {
    @Field()
    _id: string;

    @Field()
    method: string;

    @Field()
    total: number;

    @Field()
    discount: number;

    @Field()
    addressName: string;

    @Field()
    city: string;

    @Field()
    url: string

    @Field()
    userName: string;

    @Field()
    productName: string;

}

@ObjectType()
export class OrderNResponse extends BaseResponse {

    @Field(() => [OrderN], { nullable: true })
    orders?: [OrderN]

    @Field(() => OrderN, { nullable: true })
    order?: OrderN

    @Field()
    message: string;
}

