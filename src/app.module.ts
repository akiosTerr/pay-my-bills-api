import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecurringBillsController } from './recurring-bills/recurring-bills.controller';
import { RecurringBillsService } from './recurring-bills/recurring-bills.service';

@Module({
  imports: [],
  controllers: [AppController, RecurringBillsController],
  providers: [AppService, RecurringBillsService],
})
export class AppModule {}
