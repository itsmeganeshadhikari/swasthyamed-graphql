import { TokenRepository, UsersRepository } from 'libs/data-access/src';
import { EmailService } from '../auth/service/email.service';
import { HashService } from '../auth/service/hash.service';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

export const providers = [
  UserResolver,
  UserService,
  UsersRepository,
  HashService,
  EmailService,
  TokenRepository,
];
