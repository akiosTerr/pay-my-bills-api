import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { Model } from 'mongoose'
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { HistoryItem } from 'src/history/interfaces/history-item.interface';
import { checkTypeThenApplyFunction, compareDateToPresent, dateToString, modifyDay, nextMonthDate, pipe, stringToDate } from 'src/utils/general_utils';
import { calculateBillStatus } from 'src/utils/recurring_bill_utils';


@Injectable()
export class RecurringBillsService {
    constructor(@InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>,@InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>) {}

    async getAll(): Promise<RecurringBill[]> {

        const recurringBills = await this.recurringBillModel.find()
        const formatedBills = await Promise.all(recurringBills.map
            (async (bill) => {
                const latestHistoryItem = await this.historyItemModel.findOne({recurringBillId: bill.id}).sort('-created_at')
                const expirationDay = Number(bill.dueDate)
                const originDate = latestHistoryItem ? latestHistoryItem.paymentDate : bill.createdAt
                const expireDay = pipe(
                    checkTypeThenApplyFunction('string',stringToDate),
                    modifyDay(expirationDay),
                    nextMonthDate)
                    (originDate)
                
                const billStatus = calculateBillStatus(compareDateToPresent(expireDay))
                const dueDate = dateToString(expireDay)
                const previousPrice = latestHistoryItem ? latestHistoryItem.value : 'no payments'
               
                const billItem: RecurringBill = {
                    _id: bill._id,
                    title: bill.title,
                    gotoUrl: bill.gotoUrl,
                    previousPrice,
                    dueDate,
                    billStatus,
                }
                return billItem
            })
        )
        return formatedBills
    }

    async getOne(id: string): Promise<RecurringBill> {
        return await this.recurringBillModel.findOne({ _id: id});
    }

    async create(newBill: CreateRecurringBillDto): Promise<RecurringBill> {
        const newRecurringBill = new this.recurringBillModel(newBill)
        return await newRecurringBill.save()
    }

    async delete(id: string): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndRemove(id)
    }

    async update(id:string, bill: CreateRecurringBillDto): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndUpdate(id, bill,{new: true})
    }
}
