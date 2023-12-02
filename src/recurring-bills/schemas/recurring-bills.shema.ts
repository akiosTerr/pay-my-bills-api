import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose from "mongoose"
import { User } from "src/auth/schemas/user.schema"

@Schema({
    timestamps: true
})
export class RecurringBill {
    @Prop()
    title: string
    
    @Prop()
    expirationDay: number

    @Prop()
    nextExpirationDate: Date
    
    @Prop()
    billCategory: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User
}

export const RecurringBillSchema = SchemaFactory.createForClass(RecurringBill)