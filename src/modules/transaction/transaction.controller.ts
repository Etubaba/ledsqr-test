import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/history/:id')
  async getAllTransactions(@Param('id') user: string) {
    return await this.transactionService.getTransactionHistory(user);
  }
}
