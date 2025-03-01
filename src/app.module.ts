import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecurringBillModule } from './recurring-bills/recurring-bills.module'
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    RecurringBillModule,
    HistoryModule,
    AuthModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
