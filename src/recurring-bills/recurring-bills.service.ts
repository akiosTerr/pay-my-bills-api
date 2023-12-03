import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { Model } from 'mongoose';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { HistoryItem } from 'src/history/interfaces/history-item.interface';
import { getNextDateByMonthDay } from 'src/utils/general_utils';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateRecurringBillDto } from './dto/update-recurring-bill.dto';


@Injectable()
export class RecurringBillsService {
    constructor(
            @InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>,
            @InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>
        ) {}

    async getAll(): Promise<RecurringBill[]> {
        const recurringBills = await this.recurringBillModel.find()
        return recurringBills
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

    async create(newBill: CreateRecurringBillDto, user: User): Promise<RecurringBill> {
        
        const closestDate = getNextDateByMonthDay(newBill.expirationDay)

        const fnewbill = Object.assign(newBill, {user: user._id, nextExpirationDate: closestDate})

        const newRecurringBill = new this.recurringBillModel(fnewbill)
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

    async update(id:string, bill: UpdateRecurringBillDto): Promise<RecurringBill> {
        return await this.recurringBillModel.findByIdAndUpdate(id, bill,{new: true})
    }
}
