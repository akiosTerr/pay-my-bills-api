import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history-item';
import { HistoryService } from './history.service';
import { HistoryItem } from './interfaces/history-item.interface';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyItemService: HistoryService) {}

    @Get()
    async findAll(): Promise<HistoryItem[]> {
        return this.historyItemService.getAll()
    }

    @Post()
    addHistoryItem(@Body() historyItemDto: CreateHistoryItemDto): Promise<HistoryItem> {
        return this.historyItemService.create(historyItemDto)
    }

    @Delete(':id')
    removeHistoryItem(@Param('id') id): Promise<HistoryItem> {
        return this.historyItemService.delete(id)
    }

}
