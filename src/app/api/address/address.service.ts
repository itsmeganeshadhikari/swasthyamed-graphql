import {
    Injectable,
} from '@nestjs/common';
import { AddressRepository } from 'libs/data-access/src/repository/address.repository';
import { CreateAddressDTO } from './dto/input/create-address.dto';
@Injectable()
export class AddressService {
    constructor(
        private readonly addressRepository: AddressRepository,
    ) { }

    async createAddress(input: CreateAddressDTO) {
        console.log(input);
        try {
            const address = await this.addressRepository.create(input);
            return address;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllAddress() {
        return await this.addressRepository.find();
    }

    async getAddressById(id: string) {
        return this.addressRepository.find({ user: id });
    }
}
