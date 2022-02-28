import * as mongoose from 'mongoose'

export const HistoryItemSchema = new mongoose.Schema({
    title: String,
    value: String,
    paymentDate: String,
    expirationDate: String
});