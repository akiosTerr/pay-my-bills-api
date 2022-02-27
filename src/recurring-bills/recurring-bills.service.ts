import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { Model } from 'mongoose'


@Injectable()
export class RecurringBillsService {
    constructor(@InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>) {}

    async getAll(): Promise<RecurringBill[]> {
        return await this.recurringBillModel.find()
    }

    async getOne(id: string): Promise<RecurringBill> {
        return await this.recurringBillModel.findOne({ _id: id});
    }

    async create(newBill: RecurringBill): Promise<RecurringBill> {
        const newRecurringBill = new this.recurringBillModel(newBill)
        return await newRecurringBill.save()
    }

    async delete(id: string): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndRemove(id)
    }

    async update(id:string, bill: RecurringBill): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndUpdate(id, bill,{new: true})
    }
}
