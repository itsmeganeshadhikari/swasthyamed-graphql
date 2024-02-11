import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../schema/order.schema";

export class OrderRepository extends BaseRepository {
    constructor(
        @InjectModel(Order.name) private readonly order: Model<OrderDocument>,
    ) {
        super(order);
    }
}