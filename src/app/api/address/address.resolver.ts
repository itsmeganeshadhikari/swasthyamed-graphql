import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddressResponse } from './dto/response/address.response';
import { JwtAuthGuard } from '../auth/guard/jwt.authguard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateAddressDTO } from './dto/input/create-address.dto';
import { AddressService } from './address.service';
import lang from '../constants/language';

@Resolver()
export class AddressResolver {
    constructor(
        private addressService: AddressService
    ) {
    }
    @Mutation(() => AddressResponse, { name: "address" })
    @UseGuards(JwtAuthGuard)
    async createAddress(@Args('input') input: CreateAddressDTO) {
        try {
            const address = await this.addressService.createAddress(input);
            return {
                message: 'Address created successfully',
                address,
            };
        } catch (error) {
            throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
        }
    }

    @Query(() => AddressResponse, { name: "addressList" })
    async getAddressList() {
        try {
            const addresss = await this.addressService.getAllAddress();
            return {
                message: 'Address list',
                addresss,
            };
        } catch (error) {
            throw new HttpException("Error on create", HttpStatus.BAD_REQUEST);
        }
    }

    @Mutation(() => AddressResponse, { name: "getAddressById" })
    async getAddressById(@Args('input') input: string) {
        try {
            const addresss = await this.addressService.getAddressById(input);
            return {
                message: 'Address',
                addresss,
            };
        } catch (error) {
            throw new HttpException("Error on fetch", HttpStatus.BAD_REQUEST);
        }
    }

    @Mutation(() => AddressResponse)
    async deleteAddress(@Args('id') id: string) {
        try {
            await this.addressService.deleteAddress(id);
            return { message: 'Address deleted successfully' };
        } catch (error) {
            throw new HttpException(lang.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
        }
    }
}
