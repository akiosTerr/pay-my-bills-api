import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { getNextDateByMonthDay } from 'src/utils/general_utils';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { UpdateRecurringBillDto } from './dto/update-recurring-bill.dto';
import { RecurringBill } from './interfaces/recurring-bills.interface';


@Injectable()
export class RecurringBillsService {
    constructor(
            @InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>,
        ) {}

    async getAll(userId: string): Promise<RecurringBill[]> {
        const recurringBills = await this.recurringBillModel.find({user: userId})
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
