import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from 'libs/data-access/src/schema/order.schema';
import { OrderResponse } from './dto/order.response';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderNResponse } from './dto/ordern-response';
import { CurrentUser } from '../user/user.decorator';
import { UserDocument } from 'libs/data-access/src';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @Mutation(() => OrderResponse)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    try {
      const order = await this.orderService.create(createOrderInput);;
      return {
        message: 'Order created successfully',
        order,
      };
    } catch (error) {
      throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => [OrderResponse], { name: 'order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Mutation(() => OrderNResponse, { name: 'findOrderByUser' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      const orders = await this.orderService.findOne(id);
      return {
        message: 'Order created successfully',
        orders,
      };
    } catch (error) {
      throw new HttpException("Errpr on fetch", HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => OrderResponse)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => OrderResponse)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
