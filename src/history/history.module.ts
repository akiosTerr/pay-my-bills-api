import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryItemSchema } from './schemas/history-item';

@Module({
  imports: [MongooseModule.forFeature([{name: 'HistoryItem', schema: HistoryItemSchema}])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
