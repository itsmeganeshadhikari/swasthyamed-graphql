import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}
  /**
   * This service generates jwt token pair
   * access token and refresh token
   * @param payload
   * @param options
   * @returns
   */
  generateTokenPair(
    payload: any,
    options: {
      accessTokenSecret: string;
      accessTokenExpiryMs: number;
      refreshTokenSecret: string;
      refreshTokenExpiryMs: number;
    },
  ): {
    accessToken: string;
    accessTokenExpiresIn: Date;
    refreshToken: string;
    refreshTokenExpiresIn: Date;
  } {
    try {
      const {
        accessTokenSecret,
        accessTokenExpiryMs,
        refreshTokenSecret,
        refreshTokenExpiryMs,
      } = options;
      const access_token = this.jwtService.sign(payload, {
        secret: accessTokenSecret,
        expiresIn: accessTokenExpiryMs,
      });
      const refresh_token = this.jwtService.sign(payload, {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpiryMs,
      });
      const currentDate = new Date();
      return {
        accessToken: 'Bearer ' + access_token,
        accessTokenExpiresIn: new Date(
          currentDate.getTime() + accessTokenExpiryMs,
        ),
        refreshToken: refresh_token,
        refreshTokenExpiresIn: new Date(
          currentDate.getTime() + refreshTokenExpiryMs,
        ),
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
