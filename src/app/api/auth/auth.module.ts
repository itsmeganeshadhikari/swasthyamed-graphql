import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { providers } from './providers';
import { PassportModule } from '@nestjs/passport';
import { mongooseModels } from './mongoose.models';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(mongooseModels),
  ],
  providers: providers,
  exports: [AuthModule],
})
export class AuthModule {}
