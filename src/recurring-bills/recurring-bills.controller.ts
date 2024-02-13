import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { RecurringBillsService } from './recurring-bills.service';
import { UpdateRecurringBillDto } from './dto/update-recurring-bill.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('recurring-bills')
export class RecurringBillsController {
    constructor(private readonly recurringBillsService: RecurringBillsService) {}

    @Get()
    async findAll(@Req() req): Promise<RecurringBill[]> {
        const userId = req.user.id
        return this.recurringBillsService.getAll(userId)
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.getOne(id)
    }
    
    @Post()
    async addRecurringBill(
        @Body() recurringBillDto: CreateRecurringBillDto,
        @Req() req
    ): Promise<RecurringBill> {
        return this.recurringBillsService.create(recurringBillDto, req.user)
    }

    @Delete(':id')
    async removeRecurringBill(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.delete(id)
    }

    @Put(':id')
    async editRecurringBill(@Param('id') id, @Body() updateRecurringBill: UpdateRecurringBillDto): Promise<RecurringBill> {
        return this.recurringBillsService.update(id, updateRecurringBill)
    }
}
