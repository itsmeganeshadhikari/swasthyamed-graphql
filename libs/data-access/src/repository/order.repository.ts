import mongoose, { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../schema/order.schema";

export class OrderRepository extends BaseRepository {
    constructor(
        @InjectModel(Order.name) private readonly order: Model<OrderDocument>,
    ) {
        super(order);
    }
    async getOrderByUserId(userId: string) {
        return await this.order.aggregate([{ $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: { from: "addresses", localField: "address", foreignField: "_id", as: "addressDetails" }
        },
        {
            $lookup: { from: "users", localField: "user", foreignField: "_id", as: "userDetails" }
        },
        {
            $lookup: { from: "products", localField: "product", foreignField: "_id", as: "productDetails" }
        },
        { $unwind: "$productDetails" },
        {
            $project: {
                addressName: { $first: "$addressDetails.name" },
                city: { $first: "$addressDetails.city" },
                method: 1,
                total: 1,
                discount: 1,
                userName: { $first: "$userDetails.firstName" },
                productName: "$productDetails.productName",
            }
        }
        ]);
    }
}