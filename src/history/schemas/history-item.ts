import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { User } from "src/auth/schemas/user.schema"

@Schema({
    timestamps: true
})
export class HistoryItem {
    @Prop()
    title: string

    @Prop({unique: false})
    value: number

    @Prop()
    paymentDate: Date

    @Prop()
    expirationDate: Date

    @Prop()
    recurringBillId: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User
}

export const HistoryItemSchema = SchemaFactory.createForClass(HistoryItem)