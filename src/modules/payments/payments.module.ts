import { Module } from '@nestjs/common';
import { paymentController } from './payments.controller';
//import { WalletService } from './wallet.service';
import { PaystackModule } from 'paystack-nestjs';

@Module({
  controllers: [paymentController],
  imports: [
    PaystackModule.forRoot(PaystackModule, {
      secretKey: 'sk_test_591f8cd22393360f4bd36e7127aff9964473dd5a',
    }),
  ],
})
export class paymentModule {}
