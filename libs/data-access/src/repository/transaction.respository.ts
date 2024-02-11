import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "./base.repository";
import { Model } from "mongoose";
import { Transaction, TransactionDocument } from "../schema/transaction.schema";

export class TransactionRepository extends BaseRepository {
    constructor(
        @InjectModel(Transaction.name) private readonly transaction: Model<TransactionDocument>,
    ) {
        super(transaction);
    }

    async getAllTransactions() {
        return await this.transaction.find()
    }

    async getTransactionById(id: string | any) {
        return this.transaction.findById({ _id: id })
    }

}