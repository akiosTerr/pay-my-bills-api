import * as mongoose from 'mongoose'

export const HistoryItemSchema = new mongoose.Schema({
    title: String,
    value: Number,
    paymentDate: String,
    expirationDate: String,
    recurringBillId: String
},{timestamps:true});