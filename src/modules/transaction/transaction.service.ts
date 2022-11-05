import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class TransactionService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async GetAllTransaction() {
    const transactionHistory = await this.knex('transactions').select('*');

    return { status: true, data: transactionHistory };
  }
}
