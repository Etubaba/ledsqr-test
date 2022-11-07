import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/createUser.dto';
import { TransferFundDto } from './dto/transfer.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/balance/:id')
  async getUserWalletBalance(@Param('id') walletID: string) {
    return await this.walletService.getWalletBalance(walletID);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/fund')
  async fundUserWallet(@Body() walletDto: WalletDto) {
    return await this.walletService.fundUserWallet(walletDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/transfer/fund')
  async transferFund(@Body() transferDto: TransferFundDto) {
    return await this.walletService.transferFund(transferDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/withdrawer')
  async fundWithdrawer(@Body() walletDto: WalletDto) {
    return await this.walletService.withdrawFromWallet(walletDto);
  }

  @Get('/all')
  async getAllWallets() {
    return await this.walletService.getAllWallets();
  }
}
