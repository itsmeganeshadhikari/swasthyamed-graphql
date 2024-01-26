import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModels } from './models';
import { providers } from './provider';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature(mongooseModels),
        AuthModule,
    ],
    providers: providers,
})
export class ProductModule {}
