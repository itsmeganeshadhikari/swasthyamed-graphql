import { TransactionRepository } from "libs/data-access/src/repository/transaction.respository";
import { TransactionResolver } from "./transaction.resolver";
import { TransactionService } from "./transaction.service";

export const providers = [
    TransactionResolver,
    TransactionService,
    TransactionRepository
];