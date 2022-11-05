import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { TransferFundDto } from './dto/transfer.dto';
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

  //transfer fund from user balance (task 3)
  async transferFund(transferDto: TransferFundDto) {
    // try {
    const {
      sender_email,
      amount,
      sender_wallet_number,
      receiver_wallet_number,
      receiver_email,
    } = transferDto;

    //get sender wallet
    const senderWallet =
      sender_email !== undefined
        ? await this.knex('wallets').where({ user_email: sender_email }).first()
        : await this.knex('wallets')
            .where({ wallet_number: sender_wallet_number })
            .first();

    //if sender wallet does not exist
    if (!senderWallet) {
      throw new NotFoundException('Sender account does not exist');
    }

    //check if wallet balance is sufficient for the transaction
    if (senderWallet.amount < amount) {
      throw new NotAcceptableException('Insufficient fund');
    }

    //get receiver wallet
    const receiverWallet =
      receiver_email !== undefined
        ? await this.knex('wallets')
            .where({ user_email: receiver_email })
            .first()
        : await this.knex('wallets')
            .where({ wallet_number: receiver_wallet_number })
            .first();

    //if receiver wallet does not exist
    if (!receiverWallet) {
      throw new NotFoundException('Receiver account does not exist');
    }

    //deduct amount from sender wallet
    if (sender_email !== undefined) {
      await this.knex('wallets')
        .where({ user_email: sender_email })
        .update({
          amount: senderWallet.amount - amount,
        });
    } else {
      await this.knex('wallets')
        .where({ wallet_number: sender_wallet_number })
        .update({
          amount: senderWallet.amount - amount,
        });
    }

    //update sender wallet balance in users table
    if (sender_email !== undefined) {
      await this.knex('users')
        .where('email', sender_email)
        .update({
          wallet_balance: senderWallet.amount - amount,
        });
    } else {
      const userEmail = await this.knex('wallets')
        .where({ wallet_number: sender_wallet_number })
        .first();

      await this.knex('users')
        .where('email', userEmail.user_email)
        .update({
          wallet_balance: senderWallet.amount - amount,
        });
    }

    //add amount to receiver wallet
    if (receiver_email !== undefined) {
      await this.knex('wallets')
        .where({ user_email: receiver_email })
        .update({
          amount: receiverWallet.amount + amount,
        });
      //update receiver user table
      await this.knex('users')
        .where('email', receiver_email)
        .update({
          wallet_balance: receiverWallet.amount + amount,
        });
    } else {
      await this.knex('wallets')
        .where({ wallet_number: receiver_wallet_number })
        .update({
          amount: receiverWallet.amount + amount,
        });
      //update receiver user table
      const userEmail = await this.knex('wallets')
        .where({ wallet_number: receiver_wallet_number })
        .first();

      await this.knex('users')
        .where('email', userEmail.user_email)
        .update({
          wallet_balance: receiverWallet.amount + amount,
        });
    }

    const message =
      receiver_email !== undefined
        ? `Fund transfered to ${receiver_email} successfully`
        : `Fund transfered to wallet with id:${receiver_wallet_number} successfully`;

    return { status: true, msg: message };
    // } catch (err: any) {
    //   console.log(err.message);
    // }
  }

  //withdraw from wallet balance

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
