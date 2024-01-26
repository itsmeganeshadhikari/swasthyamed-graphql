import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'libs/data-access/src';
import { UserResponse } from 'src/app/api/user/dto/response/user.response';

@ObjectType()
class AuthResponse {
  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class UserLoginResponse extends AuthResponse {
  @Field(() => UserResponse)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
