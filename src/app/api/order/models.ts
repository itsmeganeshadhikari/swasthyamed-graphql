import { Order, OrderSchema } from "libs/data-access/src/schema/order.schema";

export const mongooseModels = [
    { name: Order.name, schema: OrderSchema },
];
