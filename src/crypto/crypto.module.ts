import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { CryptoSchema } from './schemas/crypto.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
      AuthModule,
      MongooseModule.forFeature([{name: 'Crypto', schema: CryptoSchema}])],
  controllers: [CryptoController],
  providers: [CryptoService]
})
export class CryptoModule {}
