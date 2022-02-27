import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecurringBillModule} from './recurring-bills/recurring-bills.module'
import { MongooseModule } from '@nestjs/mongoose';
import keys from './config/keys'


@Module({
  imports: [MongooseModule.forRoot(keys.mongodburl),RecurringBillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
