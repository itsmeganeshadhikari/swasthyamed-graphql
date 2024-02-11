import { Transaction, TransactionSchema } from "libs/data-access/src/schema/transaction.schema";

export const mongooseModels = [
    { name: Transaction.name, schema: TransactionSchema },
];
