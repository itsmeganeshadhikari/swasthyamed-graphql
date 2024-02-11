import { AddressRepository } from "libs/data-access/src/repository/address.repository";
import { AddressResolver } from "./address.resolver";
import { AddressService } from "./address.service";

export const providers = [
    AddressResolver,
    AddressService,
    AddressRepository
];