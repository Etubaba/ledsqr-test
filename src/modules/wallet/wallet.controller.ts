import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/createUser.dto';
import { TransferFundDto } from './dto/transfer.dto';
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
  @Post('/transfer/fund')
  async transferFund(@Body() transferDto: TransferFundDto) {
    return await this.walletService.transferFund(transferDto);
  }
  @Post('/withdrawer')
  async fundWithdrawer(@Body() walletDto: WalletDto) {
    return await this.walletService.withdrawFromWallet(walletDto);
  }

  @Get('/all')
  async getAllWallet() {
    return await this.walletService.getAllWallet();
  }
}
