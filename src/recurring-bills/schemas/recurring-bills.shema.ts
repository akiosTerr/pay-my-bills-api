import * as mongoose from 'mongoose'

export const RecurringBillSchema = new mongoose.Schema({
    title: String,
    gotoUrl: String,
    dueDate: Date,
    previousPrice: String,
    billStatus: String,
},{timestamps: true});