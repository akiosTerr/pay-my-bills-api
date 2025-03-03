import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User
}

export const CryptoSchema = SchemaFactory.createForClass(Crypto);