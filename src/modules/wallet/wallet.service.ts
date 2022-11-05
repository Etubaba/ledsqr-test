import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  //service to fund wallet for user (task 2)
  async fundUserWallet(walletDto: WalletDto) {
    try {
      const { user_email, amount, wallet_number } = walletDto;
      const userWallet =
        user_email !== undefined
          ? await this.knex('wallets').where({ user_email }).first()
          : await this.knex('wallets').where({ wallet_number }).first();

      //if user wallet exist exist
      if (!userWallet) {
        throw new NotFoundException('User not found');
      }

      //fund user wallet
      if (user_email !== undefined) {
        await this.knex('wallets')
          .where({ user_email })
          .update({
            amount: amount + userWallet.amount,
          });
      } else {
        await this.knex('wallets')
          .where({ wallet_number })
          .update({
            amount: amount + userWallet.amount,
          });
      }

      //where wallet number is used, get user email from wallet
      if (user_email === undefined) {
        const userEmail = await this.knex('wallets')
          .where({ wallet_number })
          .first();

        await this.knex('users')
          .where('email', userEmail.user_email)
          .update({
            wallet_balance: amount + userWallet.amount,
          });
      } else {
        await this.knex('users')
          .where('email', user_email)
          .update({
            wallet_balance: amount + userWallet.amount,
          });
      }

      return { status: true, msg: `User wallet funded successfull` };
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async getWalletBalance(wallet_id: string | number) {
    const userWalletBalance = await this.knex('wallets')
      .where({ user_email: wallet_id })
      .orWhere({ wallet_number: wallet_id })
      .first();
    // if wallet not found exist
    if (!userWalletBalance) {
      throw new NotFoundException('Wallet not found');
    }

    return { status: true, data: userWalletBalance };
  }

  async getAllWallet() {
    const wallets = await this.knex('wallets').select('*');
    return { status: true, data: wallets };
  }
}
