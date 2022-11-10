import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class TransactionService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async getTransactionHistory(user: string) {
    const userTransactionHistory = await this.knex('transactions')
      .where({ sender: user })
      .orWhere({ receiver: user });

    if (userTransactionHistory.length === 0) {
      throw new NotFoundException('User history not Found');
    }

    return { status: true, data: userTransactionHistory };
  }
}
