import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';
import { ProductResponse } from '../../product/dto/response/product.response';
import { UserResponse } from '../../user/dto/response/user.response';

@ObjectType()
class Order extends UserResponse {
    @Field()
    _id: string;

    @Field()
    method: string;

    @Field()
    type: string;

    @Field()
    total: number;

    @Field()
    discount: number;

    @Field()
    subTotal: number;

}

@ObjectType()
export class OrderResponse extends BaseResponse {
    @Field(() => [Order], { nullable: true })
    orders?: [Order]

    @Field(() => Order, { nullable: true })
    order?: Order
}

