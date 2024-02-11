import { ObjectType, Field, Int, ID, PartialType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  phone?: string;
}

@ObjectType()
export class AdminResponse {
  @Field({ nullable: true })
  message?: string;

  @Field((type) => [UserType], { nullable: true })
  userList?: [UserType];

  @Field((type) => UserType, { nullable: true })
  user?: UserType;
}
