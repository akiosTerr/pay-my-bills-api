import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { UpdateCryptoDto } from './dto/update-crypto.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CryptoObject } from './interfaces/crypto.interface';


@Injectable()
export class CryptoService {
  constructor(
    @InjectModel('Crypto') private readonly cryptoModel: Model<CryptoObject>,
  ) { }

  async create(cryptoItem: CreateCryptoDto, user: User): Promise<CryptoObject> {
    const fcrypto = Object.assign(cryptoItem, {user: user._id})
    const newCrypto = new this.cryptoModel(fcrypto)
    return await newCrypto.save()
  }

  async findAll(userId: string): Promise<CryptoObject[]> {
    const crypto = await this.cryptoModel.find({user: userId})
    return crypto;
  }

  async findOne(id: number): Promise<CryptoObject> {
    const crypto = await this.cryptoModel.find({ id: id })
    return crypto[0];
  }

  async update(id: string, updateCryptoDto: UpdateCryptoDto) {
    return await this.cryptoModel.findByIdAndUpdate(id, updateCryptoDto,{new: true})
  }

  async remove(id: string): Promise<CryptoObject> {
    const isValidId = mongoose.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException('Invalid ID: please enter a valid ID')
    }

    const crypto = await this.cryptoModel.findByIdAndRemove(id)

    if (!crypto) {
      throw new NotFoundException('crypto not found')
    }

    return crypto
  }
}
