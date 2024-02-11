import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from '../dto/input/create-user.dto';
import { UpdateUserDTO } from '../dto/input/update-user.dto';
import { UserResponse } from '../dto/response/user.response';
import { UserService } from '../service/user.service';

import lang from '../../constants/language';
import { JwtAuthGuard } from '../../auth/guard/jwt.authguard';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
    ) {}
  
  @Query(() => UserResponse)
  async getUser(@Args('id') id: string) {
    const [user] = await this.userService.getUser(id);

    if (!user) {
      throw new HttpException(lang.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
    }

    return { message: 'User listing', user };
  }

  @Mutation(() => UserResponse)
  async createUser(@Args('input') input: CreateUserDTO) {
    try {
      const user = await this.userService.createUser(input);
      return {
        message: 'user created successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(lang.DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UserResponse)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserDTO,
  ) {
    try {
      const updateUser = await this.userService.updateUser(id, input);

      return { message: 'User updated successfully', user: updateUser };
    } catch (error) {
      throw new HttpException(lang.DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UserResponse)
  async deleteUser(@Args('id') id: string) {
    try {
      await this.userService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(lang.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UserResponse)
  async deleteAllUsers() {
    await this.userService.deleteAllUsers();
    return { message: 'All users deleted successfully' };
  }

  @Query(() => UserResponse, { name : 'me'})
  @UseGuards(JwtAuthGuard)
  async getUserMe(@Context() context) {
    const user = await this.userService.getUserById(context.req.user.id)
    if (!user) {
      throw new HttpException(lang.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
    }

    return { user };
  }
}
