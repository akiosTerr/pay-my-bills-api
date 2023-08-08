import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecurringBillModule} from './recurring-bills/recurring-bills.module'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import keys from './config/keys'
import { HistoryModule } from './history/history.module';

@Module({
  imports: [MongooseModule.forRoot(keys.mongodburl),RecurringBillModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
