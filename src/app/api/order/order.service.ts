import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderRepository } from 'libs/data-access/src/repository/order.repository';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {
  }
  async create(createOrderInput: CreateOrderInput) {
    try {
      const order = await this.orderRepository.create(createOrderInput);
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
