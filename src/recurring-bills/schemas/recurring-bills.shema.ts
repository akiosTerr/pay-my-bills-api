import * as mongoose from 'mongoose'

export const RecurringBillSchema = new mongoose.Schema({
    title: String,
    value: String,
    gotoUrl: String,
    dueDate: String,
    previousPrice: String,
});