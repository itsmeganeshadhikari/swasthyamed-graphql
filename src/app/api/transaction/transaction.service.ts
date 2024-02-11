import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { UpdateTransactionInput } from './dto/input/update-transaction.input';
import { TransactionRepository } from 'libs/data-access/src/repository/transaction.respository';
import cloudinary from '../cloudinary/cloudinary';
// import cloudinary from '../cloudinary/cloudinary';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) { }
  async create(createTransactionInput: CreateTransactionInput) {
    const { transactionImage, user } = createTransactionInput
    const image = await this.imageUpload(transactionImage)
    return await this.transactionRepository.create(
      {
        user: user,
        image: image
      }
    );
  }

  findAll() {
    return ""
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async imageUpload(image: string) {
    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "products",
    })
    return { public_id: myCloud?.public_id, url: myCloud?.url }
  }
}
