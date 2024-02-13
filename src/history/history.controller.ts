import { Controller, Get, Post, Delete, Put, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateHistoryItemDto } from './dto/create-history-item';
import { HistoryService } from './history.service';
import { HistoryItem, LineChartData } from './interfaces/history-item.interface';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('history')
export class HistoryController {
    constructor(private readonly historyItemService: HistoryService) {}

    @Get('recbill/:id')
    async findAllByBillId(@Param('id') recurringBillId): Promise<HistoryItem[]> {
        return this.historyItemService.getAllFromBill(recurringBillId)
    }

    @Get()
    async findAll(@Req() req): Promise<HistoryItem[]> {
        return this.historyItemService.getAll(req.user.id)
    }
    
    @Get('/chart')
    async getChartData(): Promise<LineChartData[]> {
        return this.historyItemService.getChartData()
    }

    @Post()
    addHistoryItem(
        @Body() historyItemDto: CreateHistoryItemDto,
        @Req() req
    ): Promise<HistoryItem> {
        return this.historyItemService.create(historyItemDto, req.user.id)
    }

    @Delete(':id')
    removeHistoryItem(@Param('id') id): Promise<HistoryItem> {
        return this.historyItemService.delete(id)
    }

}
