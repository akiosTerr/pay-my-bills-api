import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { RecurringBill } from 'src/recurring-bills/interfaces/recurring-bills.interface';
import { HistoryItem, LineChartData } from './interfaces/history-item.interface';


@Injectable()
export class HistoryService {
    constructor(@InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>,@InjectModel('RecurringBill') private readonly recurringBillModel:Model<RecurringBill>) {}

    async getAll(): Promise<HistoryItem[]> {
        return await this.historyItemModel.find()
    }

    async getChartData(): Promise<LineChartData[]> {
        const allHistoryItems = await this.historyItemModel.find()
        const allBills = await this.recurringBillModel.find()

        const endItem = allBills.map(item => {
            const historyData = allHistoryItems.filter(history => {
                return history.recurringBillId === String(item._id)
            })

            const historyValues = historyData.map(history => {
                return Number(history.value)
            })
            const slicedData = historyValues.slice(0,5)
            return {
                title: item.title,
                data: slicedData
            }
        })
        return endItem
    }

    async getOne(id: string): Promise<HistoryItem> {
        return await this.historyItemModel.findOne({ _id: id});
    }

    async create(newItem: HistoryItem): Promise<HistoryItem> {
        const newHistoryItem = new this.historyItemModel(newItem)
        return await newHistoryItem.save()
    }

    async delete(id: string): Promise<HistoryItem> {
        return await this.historyItemModel.findByIdAndRemove(id)
    }
}
