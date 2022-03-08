import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringBillSchema } from 'src/recurring-bills/schemas/recurring-bills.shema';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryItemSchema } from './schemas/history-item';

@Module({
  imports: [MongooseModule.forFeature([{name: 'HistoryItem', schema: HistoryItemSchema},{name: 'RecurringBill', schema: RecurringBillSchema}])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
