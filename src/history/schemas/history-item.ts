import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { RecurringBill } from "src/recurring-bills/schemas/recurring-bills.shema"
import mongoose from "mongoose"

@Schema({
    timestamps: true
})
export class HistoryItem {
    @Prop()
    title: string

    @Prop()
    value: number

    @Prop()
    paymentDate: string

    @Prop()
    expirationDate: string

    @Prop()
    recurringBillId: string
}

export const HistoryItemSchema = SchemaFactory.createForClass(HistoryItem)