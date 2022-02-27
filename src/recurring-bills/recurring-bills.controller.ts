import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { RecurringBillsService } from './recurring-bills.service';

@Controller('recurring-bills')
export class RecurringBillsController {
    constructor(private readonly recurringBillsService: RecurringBillsService) {}

    @Get()
    findAll(): RecurringBill[] {
        return this.recurringBillsService.getAll()
    }

    @Post()
    addRecurringBill(@Body() recurringBill: CreateRecurringBillDto): string {
        return `item ${recurringBill.title} created`
    }

    @Delete(':id')
    removeRecurringBill(@Param('id') id): string {
        return `Deleting item number ${id}`
    }

    @Put(':id')
    editRecurringBill(@Param('id') id, @Body() updateRecurringBill: CreateRecurringBillDto) {
        const returnObj = {
            description: `Edit recurring bill number ${id}`,
            newObj: updateRecurringBill
        }
        return returnObj
    }
}
