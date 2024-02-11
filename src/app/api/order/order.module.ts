import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderRepository } from 'libs/data-access/src/repository/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModels } from './models';

@Module({
  imports: [MongooseModule.forFeature(mongooseModels)],
  providers: [OrderResolver, OrderService, OrderRepository],
  exports: [OrderService]
})
export class OrderModule { }
