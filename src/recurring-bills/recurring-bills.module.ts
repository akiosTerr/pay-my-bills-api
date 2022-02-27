import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringBillsController } from './recurring-bills.controller';
import { RecurringBillsService } from './recurring-bills.service';
import { RecurringBillSchema } from './schemas/recurring-bills.shema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'RecurringBill', schema: RecurringBillSchema}])],
  controllers: [RecurringBillsController],
  providers: [RecurringBillsService],
})
export class RecurringBillModule {}
