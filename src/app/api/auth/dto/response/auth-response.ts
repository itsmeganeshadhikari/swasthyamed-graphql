import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'libs/data-access/src';
import { UserType } from './auth-response-type';

@ObjectType()
class AuthResponse {
  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class UserLoginResponse extends AuthResponse {
  @Field(() => UserType)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
