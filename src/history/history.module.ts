import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringBillSchema } from 'src/recurring-bills/schemas/recurring-bills.shema';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryItemSchema } from './schemas/history-item';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'HistoryItem', schema: HistoryItemSchema},{name: 'RecurringBill', schema: RecurringBillSchema}])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
