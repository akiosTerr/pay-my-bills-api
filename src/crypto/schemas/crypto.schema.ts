import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: false
})
export class Crypto {
  @Prop()
  urlname: string;
  
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  amount: number;
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);