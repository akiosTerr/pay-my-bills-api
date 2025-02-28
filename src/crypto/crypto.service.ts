import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { UpdateCryptoDto } from './dto/update-crypto.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class CryptoService {
  constructor(
    @InjectModel('Crypto') private readonly cryptoModel: Model<Crypto>,
  ) { }

  async create(cryptoItem: CreateCryptoDto): Promise<Crypto> {

    const newCrypto = new this.cryptoModel(cryptoItem)
    return await newCrypto.save()
  }

  async findAll(): Promise<Crypto[]> {
    const crypto = await this.cryptoModel.find()
    return crypto;
  }

  async findOne(id: number): Promise<Crypto> {
    const crypto = await this.cryptoModel.find({ id: id })
    return crypto[0];
  }

  async update(id: number, updateCryptoDto: UpdateCryptoDto) {
    return `This action updates a #${id} crypto`;
  }

  async remove(id: string): Promise<Crypto> {
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
