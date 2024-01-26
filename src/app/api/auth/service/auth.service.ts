import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { HashService } from './hash.service';
import { UserDocument, UsersRepository } from 'libs/data-access/src';
import { UserResponse } from '../../user/dto/response/user.response';
import { UserLoginResponse } from '../dto/response/auth-response';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({email: email});    
    const candidatePassword = user.password;
    if (!user) return null;
    const isValidPass = await this.hashService.comparePassword(
      password,
      candidatePassword,
    );
    if (!isValidPass) return null;

    return user;
  }

  async login(user: UserDocument): Promise<UserLoginResponse> {
     const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAccessToken(payload);
    const refreshToken = await this.jwtService.signRefreshToken(payload);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
