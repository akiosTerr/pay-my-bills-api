import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { RecurringBill } from 'src/recurring-bills/interfaces/recurring-bills.interface';
import { HistoryItem, LineChartData } from './interfaces/history-item.interface';
import { nextMonthDate } from 'src/utils/general_utils';
import mongoose from 'mongoose';


@Injectable()
export class HistoryService {
    constructor(
        @InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>,
        @InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>
    ) {}

    async getAllFromBill(billId: string): Promise<HistoryItem[]> {
        const isValidId =  mongoose.isValidObjectId(billId)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }
        const items = await this.historyItemModel.find({recurringBillId: billId})
        return items
    }
        
    async getAll(userId: string): Promise<HistoryItem[]> {
        return await this.historyItemModel.find({user: userId})
    }

    async getChartData(): Promise<LineChartData[]> {
        const allHistoryItems = await this.historyItemModel.find()
        const allBills = await this.recurringBillModel.find()

        const endItem = allBills.map(item => {
            const historyData = allHistoryItems.filter(history => {
                return history.recurringBillId === String(item._id)
            })

            const historyValues = historyData.map(history => {
                return {
                    value: Number(history.value),
                    expiration: history.expirationDate
                }
            })
            const slicedData = historyValues.slice(0,5)
            return {
                title: item.title,
                data: slicedData,
            }
        })
        return endItem
    }

    async getOne(id: string): Promise<HistoryItem> {
        const isValidId =  mongoose.isValidObjectId(id)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }
        return await this.historyItemModel.findOne({ _id: id});
    }

    async create(newItem: HistoryItem, user: string): Promise<HistoryItem> {
        const isValidId =  mongoose.isValidObjectId(newItem.recurringBillId)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }

        const session = await this.historyItemModel.db.startSession();

        session.startTransaction();

        try {

            const formatedHistoryItem = Object.assign(newItem, {title: newItem.title, user})

            const newHistoryItem = await new this.historyItemModel(formatedHistoryItem).save()

            const nextExpirationDate = nextMonthDate(newItem.expirationDate)

            const updatedBill = { nextExpirationDate }

            await this.recurringBillModel.findByIdAndUpdate(newItem.recurringBillId, updatedBill,{new: true})
            
            await session.commitTransaction();
            session.endSession();

            return newHistoryItem

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error('Transaction aborted due to error:', error);
        }
    }

    async delete(id: string): Promise<HistoryItem> {
        const isValidId =  mongoose.isValidObjectId(id)
        if(!isValidId) {
            throw new BadRequestException('Invalid ID: please enter a valid ID')
        }
        return await this.historyItemModel.findByIdAndRemove(id)
    }
}
