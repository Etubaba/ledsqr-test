import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/createUser.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/balance/:id')
  async getUserWalletBalance(@Param('id') walletID: string) {
    return await this.walletService.getWalletBalance(walletID);
  }

  @Post('/fund')
  async fundUserWallet(@Body() walletDto: WalletDto) {
    return await this.walletService.fundUserWallet(walletDto);
  }

  @Get()
  async getAllWallet() {
    return await this.walletService.getAllWallet();
  }
}
