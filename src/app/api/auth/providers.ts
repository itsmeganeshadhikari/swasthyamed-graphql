import { ConfigService } from '@nestjs/config';

/* custom services */
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';
import { EmailService } from './service/email.service';
import { HashService } from './service/hash.service';
import { JwtService } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { TokenRepository, UsersRepository } from 'libs/data-access/src';
import { RolesGuard } from './guard/roles.guard';

export const providers = [
  /* resolvers */
  AuthResolver,
  /* services */
  AuthService,
  JwtService,
  ConfigService,
  LocalStrategy,
  JwtStrategy,
  EmailService,
  HashService,
  /* repositories */
  UsersRepository,
  TokenRepository,
];
