import {
    Injectable, NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from 'libs/data-access/src/repository/address.repository';
import { CreateAddressDTO } from './dto/input/create-address.dto';
import lang from '../constants/language';

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
        return await this.addressRepository.find({ user: id });
    }

    async deleteAddress(id: string) {
        const address = await this.addressRepository.findById(id);
        if (!address) {
            throw new NotFoundException(lang.INVALID_USER_ID);
        }
        await this.addressRepository.deleteById(id);
        return true;
    }
}
