import { Module } from '@nestjs/common';
import { RecurringBillsController } from './recurring-bills.controller';
import { RecurringBillsService } from './recurring-bills.service';

@Module({
  imports: [],
  controllers: [RecurringBillsController],
  providers: [RecurringBillsService],
})
export class AppModule {}
