import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateUserDTO } from '../dto/input/create-user.dto';
import { UpdateUserDTO } from '../dto/input/update-user.dto';

import lang from '../../constants/language';
import { HashService } from '../../auth/service/hash.service';
import { User, UsersRepository } from 'libs/data-access/src';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async getUser(id: string) {
    /* create pipeline */
    const Oid = new mongoose.Types.ObjectId(id);
    const filter = [{ $match: { _id: { $eq: Oid } } }];
    return this.userRepository.getUser(filter);
  }

  async getUserById(id: string) {
    return await this.userRepository.findById(id);
  }

  async updateUserById(id: string, data) {
    return await this.userRepository.updateById(id, data, { new: true });
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteById(id);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async createUser(input: CreateUserDTO) {
    const { firstName, lastName, email, phone, password } = input;
    const hash = await this.hashService.hashPassword(password);

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      phone,
      password: hash
    });
    return user;
  }

  async updateUser(id: string, input: UpdateUserDTO) {
    // find the user if exists;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(lang.INVALID_USER_ID);
    }
    const updatedUser = await this.userRepository.updateById(id, input, {new: true,});
    if (!updatedUser) {
      throw new BadRequestException(lang.INVALID_USER_INPUTS);
    }
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(lang.INVALID_USER_ID);
    }

    await this.userRepository.deleteById(id);
    return true;
  }

  async deleteAllUsers() {
    return await this.userRepository.deleteMany({});
  }

   async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({email});
    }
}
