import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { providers } from './provider';
import { mongooseModels } from './models';
import { UserService } from './service/user.service';

@Module({
  imports: [MongooseModule.forFeature(mongooseModels)],
  providers: providers,
  exports:[UserService]
})
export class UserModule {}
