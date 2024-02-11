import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class Address {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    building: string;

    @Field()
    street: string;

    @Field()
    state: string;

    @Field()
    city: string;

    @Field()
    isDefault: boolean;

    @Field()
    phone: string
}

@ObjectType()
export class AddressResponse extends BaseResponse {
    @Field(() => [Address], { nullable: true })
    addresss?: [Address]

    @Field(() => Address, { nullable: true })
    address?: Address

    @Field()
    message?: string;
}

