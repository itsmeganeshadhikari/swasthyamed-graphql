import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
  ) {}

  async signAccessToken(payload) {
    return jwt.sign(payload, this.configService.get('ACCESS_TOKEN_SECRET'), {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.configService.get('ACCESS_TOKEN_SECRET'));
  }

  async signRefreshToken(payload) {
    return jwt.sign(payload, this.configService.get('REFRESH_TOKEN_SECRET'), {
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
    });
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.configService.get('REFRESH_TOKEN_SECRET'));
  }
}
