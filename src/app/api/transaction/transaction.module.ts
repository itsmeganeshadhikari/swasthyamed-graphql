import { Module } from '@nestjs/common';
import { mongooseModels } from './transaction.model';
import { providers } from './providers';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';

@Module({
  imports: [MongooseModule.forFeature(mongooseModels)],
  providers: providers,
  exports: [TransactionService]

})
export class TransactionModule { }
