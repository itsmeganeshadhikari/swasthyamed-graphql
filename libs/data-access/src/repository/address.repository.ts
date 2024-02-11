import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Address, AddressDocument } from "../schema/address.schema";

export class AddressRepository extends BaseRepository {
    constructor(
        @InjectModel(Address.name) private readonly address: Model<AddressDocument>,
    ) {
        super(address);
    }

    async getAllAddress() {
        return await this.address.find()
    }

    async getAddressById(id: string | any) {
        return this.address.findById({ _id: id })
    }

}