import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { HistoryItem } from './interfaces/history-item.interface';


@Injectable()
export class HistoryService {
    constructor(@InjectModel('HistoryItem') private readonly historyItemModel:Model<HistoryItem>) {}

    async getAll(): Promise<HistoryItem[]> {
        return await this.historyItemModel.find()
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
