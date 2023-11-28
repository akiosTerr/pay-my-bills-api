import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { RecurringBillsService } from './recurring-bills.service';
import { UpdateRecurringBillDto } from './dto/update-recurring-bill.dto';

@Controller('recurring-bills')
export class RecurringBillsController {
    constructor(private readonly recurringBillsService: RecurringBillsService) {}

    @Get()
    async findAll(): Promise<RecurringBill[]> {
        return this.recurringBillsService.getAll()
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.getOne(id)
    }

    @Post()
    addRecurringBill(@Body() recurringBillDto: CreateRecurringBillDto): Promise<RecurringBill> {
        return this.recurringBillsService.create(recurringBillDto)
    }

    @Delete(':id')
    removeRecurringBill(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.delete(id)
    }

    @Put(':id')
    editRecurringBill(@Param('id') id, @Body() updateRecurringBill: UpdateRecurringBillDto): Promise<RecurringBill> {
        return this.recurringBillsService.update(id, updateRecurringBill)
    }
}
