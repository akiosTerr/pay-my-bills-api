import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateRecurringBillDto } from './dto/create-recurring-bill.dto';
import { RecurringBill } from './interfaces/recurring-bills.interface';
import { RecurringBillsService } from './recurring-bills.service';
import { UpdateRecurringBillDto } from './dto/update-recurring-bill.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recurring-bills')
export class RecurringBillsController {
    constructor(private readonly recurringBillsService: RecurringBillsService) {}

    @UseGuards(AuthGuard())
    @Get()
    async findAll(): Promise<RecurringBill[]> {
        return this.recurringBillsService.getAll()
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    async findOne(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.getOne(id)
    }
    
    @UseGuards(AuthGuard())
    @Post()
    async addRecurringBill(
        @Body() recurringBillDto: CreateRecurringBillDto,
        @Req() req
    ): Promise<RecurringBill> {
        console.log(req.user)
        return this.recurringBillsService.create(recurringBillDto, req.user)
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    async removeRecurringBill(@Param('id') id): Promise<RecurringBill> {
        return this.recurringBillsService.delete(id)
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    async editRecurringBill(@Param('id') id, @Body() updateRecurringBill: UpdateRecurringBillDto): Promise<RecurringBill> {
        return this.recurringBillsService.update(id, updateRecurringBill)
    }
}
