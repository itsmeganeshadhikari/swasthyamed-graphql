import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { TransactionResponse } from './dto/response/transaction.reponse';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Mutation(() => TransactionResponse)
  async createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
    try {
      const transaction = await this.transactionService.create(createTransactionInput);
      return {
        message: 'Transactions created successfully',
        transaction,
      };
    } catch (error) {
      throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
    }
  }

  // @Query(() => [TransactionResponse], { name: 'transaction' })
  // findAll() {
  //   return this.transactionService.findAll();
  // }

  // @Query(() => TransactionResponse, { name: 'transaction' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.transactionService.findOne(id);
  // }

  // @Mutation(() => TransactionResponse)
  // updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
  //   return this.transactionService.update(updateTransactionInput.id, updateTransactionInput);
  // }

  // @Mutation(() => TransactionResponse)
  // removeTransaction(@Args('id', { type: () => Int }) id: number) {
  //   return this.transactionService.remove(id);
  // }
}
