import { Address, addressSchema } from "libs/data-access/src/schema/address.schema";

export const mongooseModels = [
    { name: Address.name, schema: addressSchema },
];
