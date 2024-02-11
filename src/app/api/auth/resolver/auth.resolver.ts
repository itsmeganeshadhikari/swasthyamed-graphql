import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../guard/local.authguard';
import { AuthService } from '../service/auth.service';
import { UserLoginResponse } from '../dto/response/auth-response';
import { LoginUserDTO } from '../dto/input/login-user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  /*
  @desc     User login
  @access   Public
  @res      login 
  @params   {email: string, password: string}
   */
  @Mutation(() => UserLoginResponse, { name: 'login' })
  @UseGuards(GqlAuthGuard)
  async login(@Args('input') input: LoginUserDTO, @Context() context) { 
    return await this.authService.login(context.user);
  }
}
