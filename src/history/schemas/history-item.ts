import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

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
}

export const HistoryItemSchema = SchemaFactory.createForClass(HistoryItem)