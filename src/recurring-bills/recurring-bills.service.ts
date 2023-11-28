import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { Model } from 'mongoose'
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { HistoryItem } from 'src/history/interfaces/history-item.interface';
import { checkTypeThenApplyFunction, compareDateToPresent, dateToString, modifyDay, nextMonthDate, pipe, stringToDate } from 'src/utils/general_utils';
import { calculateBillStatus } from 'src/utils/recurring_bill_utils';
import mongoose from 'mongoose';


@Injectable()
export class RecurringBillsService {
    constructor(@InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>,@InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>) {}

    async getAll(): Promise<RecurringBill[]> {

        const recurringBills = await this.recurringBillModel.find()
        const formatedBills = await Promise.all(recurringBills.map
            (async (bill) => {
                const latestHistoryItem = await this.historyItemModel.findOne({recurringBillId: bill.id}).sort({'paymentDate': -1})
                const rawDate = new Date(bill.dueDate)
                rawDate.setDate(bill.dueDate.getDate()+1)
                const expirationDay = rawDate.getDate()
                const originDate = latestHistoryItem ? latestHistoryItem.paymentDate : undefined
                const dueDate = originDate ? 
                pipe(modifyDay(expirationDay),nextMonthDate) (originDate): rawDate
                
                
                const billStatus = calculateBillStatus(compareDateToPresent(dueDate))
                const previousPrice = latestHistoryItem ? latestHistoryItem.value : 'no payments'
               
                const billItem: RecurringBill = {
                    _id: bill._id,
                    title: bill.title,
                    gotoUrl: bill.gotoUrl,
                    billCategory: bill.billCategory,
                    previousPrice: String(previousPrice),
                    billStatus,
                    dueDate,
                }
                return billItem
            })
        )
        return formatedBills
    }

    async getOne(id: string): Promise<RecurringBill> {
        const isValidId =  mongoose.isValidObjectId(id)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }
        const bill = await this.recurringBillModel.findOne({ _id: id});

        if (!bill) {
            throw new NotFoundException('Bill not found')
        }

        return bill
    }

    async create(newBill: CreateRecurringBillDto): Promise<RecurringBill> {
        const newRecurringBill = new this.recurringBillModel(newBill)
        return await newRecurringBill.save()
    }

    async delete(id: string): Promise<RecurringBill> {
        const isValidId =  mongoose.isValidObjectId(id)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }

        const bill = await this.recurringBillModel.findByIdAndRemove(id)

        if (!bill) {
            throw new NotFoundException('Bill not found')
        }
        return bill
    }

    async update(id:string, bill: CreateRecurringBillDto): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndUpdate(id, bill,{new: true})
    }
}
