import * as mongoose from 'mongoose'

export const RecurringBillSchema = new mongoose.Schema({
    title: String,
    gotoUrl: String,
    dueDate: String,
    previousPrice: String,
});