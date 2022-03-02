import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryItemSchema } from 'src/history/schemas/history-item';
import { RecurringBillsController } from './recurring-bills.controller';
import { RecurringBillsService } from './recurring-bills.service';
import { RecurringBillSchema } from './schemas/recurring-bills.shema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'RecurringBill', schema: RecurringBillSchema},{name: 'HistoryItem', schema: HistoryItemSchema}])],
  controllers: [RecurringBillsController],
  providers: [RecurringBillsService],
})
export class RecurringBillModule {}
