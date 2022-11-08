import { Controller } from '@nestjs/common';
import { InjectPaystackClient } from 'paystack-nestjs';
import { Paystack } from 'paystack-sdk';

@Controller('wallet')
export class paymentController {
  constructor(
    @InjectPaystackClient() private readonly paystackClient: Paystack,
  ) {}
}
