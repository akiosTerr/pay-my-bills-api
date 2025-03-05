import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { UpdateCryptoDto } from './dto/update-crypto.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @Post()
  create(
    @Body() createCryptoDto: CreateCryptoDto,
    @Req() req
  ) {
    return this.cryptoService.create(createCryptoDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id
    return this.cryptoService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
    return this.cryptoService.update(id, updateCryptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoService.remove(id);
  }
}
