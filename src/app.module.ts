import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from './modules/wallet/wallet.module';
import * as dotenv from 'dotenv';
import { WalletService } from './modules/wallet/wallet.service';
import { TransactionModule } from './modules/transaction/transaction.module';

dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        // version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        },
      },
    }),
    UsersModule,
    AuthModule,
    WalletModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
