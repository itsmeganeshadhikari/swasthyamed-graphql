import { Module } from '@nestjs/common';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModels } from './model';
import { AuthModule } from '../auth/auth.module';
import { providers } from './provider';

@Module({
  imports: [
    MongooseModule.forFeature(mongooseModels),
    AuthModule,
  ],
  providers: providers
})
export class AddressModule { }
