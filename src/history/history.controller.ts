import { Controller, Get, Post, Delete, Put, Body, Param, Req } from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history-item';
import { HistoryService } from './history.service';
import { HistoryItem, LineChartData } from './interfaces/history-item.interface';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyItemService: HistoryService) {}

    @Get()
    async findAll(): Promise<HistoryItem[]> {
        return this.historyItemService.getAll()
    }
    
    @Get('/chart')
    async getChartData(): Promise<LineChartData[]> {
        return this.historyItemService.getChartData()
    }

    @Post()
    addHistoryItem(
        @Body() historyItemDto: CreateHistoryItemDto,
    ): Promise<HistoryItem> {
        return this.historyItemService.create(historyItemDto)
    }

    @Delete(':id')
    removeHistoryItem(@Param('id') id): Promise<HistoryItem> {
        return this.historyItemService.delete(id)
    }

}
