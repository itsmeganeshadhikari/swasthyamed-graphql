import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from 'src/app/api/common/base.response';

@ObjectType()
class User {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  phone: string;
  @Field()
  role: string;
}

@ObjectType()
export class UserResponse extends BaseResponse {
  @Field(() => [User], { nullable: true })
  users?: [User];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class MockResponse {
  @Field()
  message: string;
}
