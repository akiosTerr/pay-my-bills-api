import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({
    timestamps: true
})
export class HistoryItem {
    @Prop()
    title: string

    @Prop()
    value: number

    @Prop()
    paymentDate: Date

    @Prop()
    expirationDate: Date

    @Prop()
    recurringBillId: string
}

export const HistoryItemSchema = SchemaFactory.createForClass(HistoryItem)