import { Field, InputType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

@InputType()
export class CreateAddressDTO {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    building: string;

    @Field()
    @IsString()
    street: string;

    @Field()
    @IsString()
    state: string;

    @Field()
    @IsOptional()
    post: string;

    @Field()
    @IsOptional()
    country: string;

    @Field()
    @IsOptional()
    destination: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    city: string;

    @Field({ defaultValue: false })
    @IsOptional()
    isDefault: boolean

    @Field()
    @IsString()
    @IsNotEmpty()
    phone: string

    @Field()
    @IsString()
    @IsNotEmpty()
    user: string
}
